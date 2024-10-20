import React from "react";
import Example from "../../(marketplace)/page";
import { PROPERTY_DATA, VENDOR_URLS } from "@/constants/property-data";

type Product = {
  id: number;
  pcm: string;
  name: string;
  description: string;
  postcode: string;
  city: string;
  bedrooms: string;
  bathrooms: string;
  imageUrls: string[];
  roi: number;
  pmi: number;
  area: number;
  occupancyRate: number;
  vendor: string;
  rentIncrease: number;
};

const products = PROPERTY_DATA.slice(0, 2);

export default function Dashboard() {
  return (
    <div className="grid gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card title="Total Revenue" value="£100,000" />
        <Card title="Average Monthly Revenue" value="£8,333" />
      </div>

      <div className="flex flex-wrap gap-8">
        {products.map((product) => (
          <a
            key={product.id}
            href={`/${product.id}`}
            className="group relative"
          >
            <div className="w-[480px]">
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  maxWidth: "100%",
                }}
              >
                <div className="relative">
                  <img
                    src={product.imageUrls[0]}
                    style={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                    }}
                    alt={product.name}
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      background: "rgba(0, 0, 0, 0.7)",
                      backdropFilter: "blur(5px)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      borderRadius: "8px",
                      padding: "4px 12px",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "18px",
                      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    }}
                  >
                    £
                    {(
                      parseInt(product.pcm.replace(/[^0-9]/g, "")) * 12
                    ).toLocaleString()}
                  </span>
                </div>

                <div style={{ paddingTop: "12px" }} className="relative">
                  <h2
                    style={{
                      margin: "0 0 8px",
                      color: "#333",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {product.name}
                  </h2>

                  <p
                    style={{
                      margin: "0 0 8px",
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    {product.city}, {product.postcode}
                  </p>

                  <p
                    style={{
                      margin: "4px 0",
                      color: "#555",
                      fontSize: "14px",
                    }}
                  >
                    <strong>ROI:</strong> {product.roi}%
                  </p>
                  <p
                    style={{
                      margin: "4px 0",
                      color: "#555",
                      fontSize: "14px",
                    }}
                  >
                    <strong>Passive Monthly Income:</strong> {product.pmi}
                  </p>
                  <p
                    style={{
                      margin: "4px 0",
                      color: "#555",
                      fontSize: "14px",
                    }}
                  >
                    <strong>Area:</strong> {product.area} sq ft
                  </p>
                  <p
                    style={{
                      margin: "4px 0",
                      color: "#555",
                      fontSize: "14px",
                    }}
                  >
                    <strong>Occupancy Rate:</strong> {product.occupancyRate}%
                  </p>
                  <p
                    style={{
                      margin: "4px 0",
                      color: "#555",
                      fontSize: "14px",
                    }}
                  >
                    <strong>Rent Increase:</strong> {product.rentIncrease}%
                  </p>
                  <p
                    style={{
                      margin: "4px 0",
                      color: "#555",
                      fontSize: "14px",
                    }}
                  >
                    <img
                      className="w-24 object-contain absolute bottom-0 right-0"
                      src={VENDOR_URLS[product.vendor]}
                      alt={product.vendor}
                    />
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
      </div>
    </div>
  );
}
