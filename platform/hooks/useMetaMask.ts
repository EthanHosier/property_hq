import { useState, useEffect } from "react";
import Web3 from "web3";

export function useMetaMaskLogin() {
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    const initWeb3 = async () => {
      // @ts-ignore
      if (window.ethereum) {
        // @ts-ignore
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        try {
          // @ts-ignore
          // Request account access if needed
          await window.ethereum.request({ method: "eth_requestAccounts" });
          // Get the connected accounts
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error("User denied account access or error occurred:", error);
        }
      } else {
        console.log("Please install MetaMask!");
      }
    };

    initWeb3();
  }, []);

  const connectWallet = async () => {
    if (web3) {
      try {
        // @ts-ignore
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  return { account, web3, connectWallet };
}
