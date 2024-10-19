"use client";

// components/MintNFT.js
import { useState } from "react";
import Web3 from "web3";
import nftABI from "../constants/abi.json"; // The ABI from the deployed NFT contract

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ADDRESS;

export default function MintNFT() {
  const [account, setAccount] = useState(null);
  const [minting, setMinting] = useState(false);

  const web3 = new Web3(
    Web3.givenProvider ||
      "https://base-sepolia.infura.io/v3/f890451fc96c4ddfb2f4ea45e00b66ef"
  );

  const connectWallet = async () => {
    // @ts-ignore
    if (window.ethereum) {
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

  const mintNFT = async () => {
    if (!account) {
      alert("Please connect wallet first");
      return;
    }

    setMinting(true);

    const contract = new web3.eth.Contract(nftABI, CONTRACT_ADDRESS);

    try {
      // Assuming the mintNFT function is public and mints the NFT to the sender
      await contract.methods.mintNFT(account).send({ from: account });
      alert("NFT minted successfully!");
    } catch (error) {
      console.error("Minting failed", error);
      alert("Minting failed");
    } finally {
      setMinting(false);
    }
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Connected account: {account}</p>
          <button onClick={mintNFT} disabled={minting} type="button">
            {minting ? "Minting..." : "Mint NFT"}
          </button>
        </div>
      ) : (
        <button onClick={connectWallet} type="button">
          Connect MetaMask Wallet
        </button>
      )}
    </div>
  );
}
