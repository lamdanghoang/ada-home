import Web3 from "web3";

// BSC Testnet RPC URL
const bscTestnetUrl = process.env.NEXT_PUBLIC_BSC_TESTNET_URL;

// Initialize Web3 instance
let web3;

if (typeof window !== "undefined" && window.ethereum) {
  // If MetaMask is installed
  web3 = new Web3(window.ethereum);
} else {
  // Fallback to the RPC URL
  // web3 = new Web3(new Web3.providers.HttpProvider(bscTestnetUrl));
}

export default web3;


