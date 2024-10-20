"use client";

// components/MintNFT.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import nftABI from "../constants/abi.json"; // The ABI from the deployed NFT contract
import { useMetaMaskLogin } from "../hooks/useMetaMask";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ADDRESS;

export default function MintNFT() {
  const { account, web3 } = useMetaMaskLogin();
  const [minting, setMinting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [signature, setSignature] = useState("");
  const router = useRouter();

  const handleInvest = async () => {
    if (!account) {
      // Redirect to sign-in page if not connected
      router.push("/signin");
      return;
    }

    if (!web3) {
      alert("Web3 not initialized");
      return;
    }

    setMinting(true);

    const contract = new web3.eth.Contract(nftABI, CONTRACT_ADDRESS);

    try {
      await contract.methods.mintNFT(account).send({ from: account });
      alert("Investment successful!");
    } catch (error) {
      console.error("Investment failed", error);
      alert("Investment failed");
    } finally {
      setMinting(false);
    }
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSignature("");
  };

  const handleRentNow = async () => {
    if (signature.trim() === "") {
      alert("Please enter your name as a signature.");
      return;
    }
    setShowPopup(false);
    await handleInvest();
  };

  return (
    <div>
      <button
        onClick={handleOpenPopup}
        disabled={minting}
        type="button"
        className="w-64 px-6 py-3 text-lg font-semibold text-white bg-[#4F46E5] rounded-full shadow-md hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-opacity-75 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {minting ? "Processing..." : "Invest Now"}
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full">
            <h2 className="text-2xl font-bold mb-4">Contract Preview</h2>
            <iframe
              src="/0a9facc0-ab50-4e2b-a6a4-773cdfd3a933_Contract_Template.pdf"
              className="w-full h-96 mb-4"
            />
            <input
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Enter name as signature"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClosePopup}
                className="px-6 py-3 text-lg font-semibold text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={handleRentNow}
                className="px-6 py-3 text-lg font-semibold text-white bg-[#4F46E5] rounded-full shadow-md hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-opacity-75 transition-colors duration-200 ease-in-out"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
