import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Web3 from 'web3';

const Header = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');


  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Check if already connected
        if (account) {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Verify saved account
          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.includes(account)) {
            const balanceWei = await web3Instance.eth.getBalance(account);
            const balanceBNB = web3Instance.utils.fromWei(balanceWei, 'ether');
            setBalance(balanceBNB);
            return;
          }
        }

        // Request new connection
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        const selectedAccount = accounts[0];
        
        // Save to session storage
        sessionStorage.setItem('walletAccount', selectedAccount);
        setAccount(selectedAccount);

        const balanceWei = await web3Instance.eth.getBalance(selectedAccount);
        const balanceBNB = web3Instance.utils.fromWei(balanceWei, 'ether');
        setBalance(balanceBNB);
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    }
  };

  const disconnectWallet = () => {
    // Clear session storage and reset state
    sessionStorage.removeItem('walletAccount');
    setAccount('');
    setBalance('0');
  };


  const sendBNB = async (toAddress, amount) => {
    try {
      // Send transaction
      const tx = await web3.eth.sendTransaction({
        from: account,
        to: toAddress,
        value: web3.utils.toWei(amount, 'ether')
      });

      console.log('Transaction successful:', tx.transactionHash);

      // Refresh balance
      const newBalanceWei = await web3.eth.getBalance(account);
      const newBalanceBNB = web3.utils.fromWei(newBalanceWei, 'ether');
      setBalance(newBalanceBNB);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-[#0F0F20] text-white">
      <div>
        <Link href="/" legacyBehavior>
          <a className="font-bold text-xl">Estate Protocol</a>
        </Link>
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/marketplace" legacyBehavior>
          <a>Marketplace</a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a>About</a>
        </Link>
        <Link href="/blog" legacyBehavior>
          <a>Blog</a>
        </Link>
        <Link href="/golden-visa" legacyBehavior>
          <a>Golden Visa</a>
        </Link>
        <a href="#" className="flex items-center space-x-2 border rounded px-2 py-2">
          <span className="material-icons">star</span>
          <span>0 Stars</span>
        </a>
        {/* <div className="p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">BNB Wallet</h2>
          {account ? (
            <>
              <div className="mb-2">
                <strong>Address:</strong> {account}
              </div>
              <div className="mb-2">
                <strong>Balance:</strong> {balance} BNB
              </div>
              <button
                onClick={() => sendBNB('0xRECIPIENT_ADDRESS', '0.1')}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Send BNB
              </button>
            </>
          ) : (
            <p>Please connect your wallet</p>
          )}
        </div> */}
       
        {account ? (
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded" onClick={()=>disconnectWallet()}>
            {account.substring(0,5)+"..."+account.substring(account.length-5,account.length)}
          </button>
        ) : (
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded" onClick={()=>connectWallet()}>
            Connect wallet
          </button>
        )}
        
      </nav>
    </header>
  );
};

export default Header;