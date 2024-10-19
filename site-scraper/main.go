package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/go-rod/rod"
)

type Property struct {
	Pcm         string   `json:"pcm"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Postcode    string   `json:"postcode"`
	City        string   `json:"city"`
	Bedrooms    string   `json:"bedrooms"`
	Bathrooms   string   `json:"bathrooms"`
	ImageUrls   []string `json:"imageUrls"`
}

func main() {
	var (
		url     = "https://www.rightmove.co.uk/property-to-rent/find.html?searchLocation=London&useLocationIdentifier=true&locationIdentifier=REGION%5E87490&rent=To+rent&radius=3.0&_includeLetAgreed=on&includeLetAgreed=false"
		browser = rod.New().MustConnect()
	)

	properties, err := rightmoveScrape(browser, url)
	if err != nil {
		panic(err)
	}

	// Save properties to a JSON file
	saveToJson(properties, "properties.json")

	fmt.Printf("%+v", properties)
}

func rightmoveUrls(browser *rod.Browser, url string) ([]string, error) {
	page := browser.MustPage(url)
	page.MustWaitNavigation()
	page.MustWaitLoad().MustWaitIdle().MustWaitRequestIdle()

	es := page.MustElements(".propertyCard-wrapper")
	fmt.Println(len(es))

	urls := []string{}

	for _, e := range es {
		url := e.MustElement("a.propertyCard-link.property-card-updates").MustProperty("href").String()
		urls = append(urls, url)
	}

	fmt.Println(urls)

	return urls, nil
}

func rightmoveScrape(browser *rod.Browser, url string) ([]Property, error) {
	urls, err := rightmoveUrls(browser, url)
	if err != nil {
		return nil, err
	}

	properties := []Property{}
	for _, url := range urls {
		// Set a timeout context for 10 seconds
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		done := make(chan error, 1)
		var property *Property

		// Start a goroutine to handle the scraping
		go func() {
			var err error
			property, err = individualRightmoveScrape(browser, url)
			done <- err
		}()

		select {
		case err := <-done:
			if err != nil {
				return nil, err
			}
			properties = append(properties, *property)
		case <-ctx.Done():
			// Timeout occurred, log or handle as necessary, move to the next URL
			continue
		}
	}

	return properties, nil
}

func individualRightmoveScrape(browser *rod.Browser, url string) (*Property, error) {
	page := browser.MustPage(url)
	page.MustWaitNavigation()
	page.MustWaitLoad().MustWaitIdle()
	page.MustWaitRequestIdle()

	price := page.MustElement("._1gfnqJ3Vtd1z40MlC0MzXu").MustText()
	fmt.Println(price)

	name := page.MustElement("._2uQQ3SV0eMHL1P6t5ZDo2q").MustText()
	description := page.MustElement(".STw8udCxUaBUMfOOZu0iL._3nPVwR0HZYQah5tkVJHFh5").MustText()
	postCode := page.MustElement(".OojFk4MTxFDKIfqreGNt0").MustText()
	city := postCode
	bedrooms := page.MustElement("._1hV1kqpVceE9m-QrX_hWDN").MustText()
	bathrooms := page.MustElement("._1aZQHX6RNe208-Ub7hMRPq").MustText()

	iUrl := page.MustElement("a._2zqynvtIxFMCq18pu-g8d_").MustProperty("href").String()
	page.Navigate(iUrl)
	page.MustWaitNavigation()
	page.MustWaitLoad().MustWaitIdle().MustWaitRequestIdle()

	imageDivs := page.MustElements("._25ZIhQnejkH18WEcfF8FCP")
	imageUrls := []string{}

	for _, imageDiv := range imageDivs {
		if imageDiv == nil {
			continue
		}

		var imageUrl string

		// Use rod.Try to attempt retrieving the img element and its src property.
		err := rod.Try(func() {
			imageUrl = imageDiv.MustElement("img").MustProperty("src").String()
		})
		if err != nil {
			// Handle the error if the img element or src property was not found.
			continue
		}

		imageUrls = append(imageUrls, imageUrl)
	}

	property := Property{
		Pcm:         price,
		Name:        name,
		Description: description,
		Postcode:    postCode,
		City:        city,
		Bedrooms:    bedrooms,
		Bathrooms:   bathrooms,
		ImageUrls:   imageUrls,
	}

	return &property, nil
}

func saveToJson(data interface{}, filename string) {
	file, err := os.Create(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(data); err != nil {
		panic(err)
	}
}
