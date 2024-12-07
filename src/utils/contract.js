import Web3 from "web3";
import ABI from '../../abi/rwa.json';

export const RWA_TOKEN_ABI = ABI;
export const RWA_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

/**
 * Get Web3 instance
 * @returns {Web3 | null} Web3 instance or null
 */
export function getWeb3() {
  // If window.ethereum is available, use it
  if (typeof window !== 'undefined' && window.ethereum) {
    return new Web3(window.ethereum);
  }
}


/**
 * Get RWA Token Contract Instance
 * @returns {Object} Contract instance
 */
export function getRwaTokenContract() {
  const web3 = getWeb3();
  if (!web3) {
    throw new Error('Web3 not found. Please install MetaMask.');
  }
  
  return new web3.eth.Contract(RWA_TOKEN_ABI, RWA_TOKEN_ADDRESS);
}

/**
 * Token interaction methods
 */
export const TokenInteractions = {
  /**
   * Get token balance
   * @param {string} address - Wallet address
   * @returns {Promise<string>} Token balance
   */
  async getBalance(address) {
    const web3 = getWeb3();
    const contract = getRwaTokenContract();
    
    try {
      const balance = await contract.methods.balanceOf(address).call();
      const decimals = await contract.methods.decimals().call();
      return web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  },
  
  /**
   * Transfer tokens
   * @param {string} from - Sender address
   * @param {string} to - Recipient address
   * @param {string} amount - Amount to transfer
   * @returns {Promise<Object>} Transaction receipt
   */
  async transfer(from, to, amount) {
    const contract = getRwaTokenContract();
    
    try {
      const web3 = getWeb3();
      const parsedAmount = web3.utils.toWei(amount, 'ether');
      
      return await contract.methods.transfer(to, parsedAmount).send({ from });
    } catch (error) {
      console.error('Error transferring tokens:', error);
      throw error;
    }
  },
  
  /**
   * Buy tokens
   * @param {string} from - Buyer address
   * @param {string} amount - Amount to buy
   * @returns {Promise<Object>} Transaction receipt
   */
  async buyTokens(from, amount) {
    const contract = getRwaTokenContract();
    
    try {
      const web3 = getWeb3();
      const parsedAmount = web3.utils.toWei(amount, 'ether');
      
      return await contract.methods.buyTokens(from, parsedAmount).send({ from });
    } catch (error) {
      console.error('Error buying tokens:', error);
      throw error;
    }
  },
  async createRealEstate(from, name, location, totalValue) {
    const web3 = getWeb3();
    const contract = getRwaTokenContract();
  
    // Validate the from address
    if (!from || !web3.utils.isAddress(from)) {
      throw new Error('Invalid Ethereum address');
    }
  
    try {
      return await contract.methods.createRealEstate(name, location, totalValue).send({ 
        from: from,
        gas: 1000000,  // Add a gas limit
        gasPrice: web3.utils.toWei('30', 'gwei')
      });
    } catch (error) {
      console.error('Error creating real estate:', error);
      throw error;
    }
  }
};