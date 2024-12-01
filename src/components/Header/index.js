import React, { useState } from 'react';
import Link from 'next/link';
import Web3 from 'web3';

const Header = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        if (account) {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.includes(account)) {
            const balanceWei = await web3Instance.eth.getBalance(account);
            const balanceBNB = web3Instance.utils.fromWei(balanceWei, 'ether');
            setBalance(balanceBNB);
            return;
          }
        }

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        const selectedAccount = accounts[0];
        
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
    sessionStorage.removeItem('walletAccount');
    setAccount('');
    setBalance('0');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#0F0F20] text-white">
      {/* Desktop and Mobile Header */}
      <div className="flex justify-between items-center px-4 py-3">
        <div>
          <Link href="/" legacyBehavior>
            <a className="font-bold text-xl">Estate Protocol</a>
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu} 
            className="focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/marketplace" legacyBehavior>
            <a>Marketplace</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a>About</a>
          </Link>
          <Link href="/approve" legacyBehavior>
            <a>Approve</a>
          </Link>
          <Link href="/golden-visa" legacyBehavior>
            <a>Golden Visa</a>
          </Link>
          <a href="#" className="flex items-center space-x-2 border rounded px-2 py-2">
            <span className="material-icons">star</span>
            <span>0 Stars</span>
          </a>
          
          {account ? (
            <button 
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
              onClick={disconnectWallet}
            >
              {account.substring(0,5)+"..."+account.substring(account.length-5,account.length)}
            </button>
          ) : (
            <button 
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
              onClick={connectWallet}
            >
              Connect wallet
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div 
        className={`
          fixed top-0 right-0 w-64 h-full bg-[#0F0F20] transform transition-transform duration-300 ease-in-out z-50
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className="font-bold text-xl">Menu</span>
          <button 
            onClick={closeMobileMenu} 
            className="focus:outline-none"
            aria-label="Close mobile menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          <Link href="/marketplace" legacyBehavior>
            <a onClick={closeMobileMenu} className="block py-2 border-b border-gray-700">Marketplace</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a onClick={closeMobileMenu} className="block py-2 border-b border-gray-700">About</a>
          </Link>
          <Link href="/approve" legacyBehavior>
            <a onClick={closeMobileMenu} className="block py-2 border-b border-gray-700">Approve</a>
          </Link>
          <Link href="/golden-visa" legacyBehavior>
            <a onClick={closeMobileMenu} className="block py-2 border-b border-gray-700">Golden Visa</a>
          </Link>
          <a 
            href="#" 
            className="flex items-center space-x-2 border rounded px-2 py-2 justify-center"
          >
            <span className="material-icons">star</span>
            <span>0 Stars</span>
          </a>
          
          {account ? (
            <button 
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mt-4"
              onClick={() => {
                disconnectWallet();
                closeMobileMenu();
              }}
            >
              {account.substring(0,5)+"..."+account.substring(account.length-5,account.length)}
            </button>
          ) : (
            <button 
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mt-4"
              onClick={() => {
                connectWallet();
                closeMobileMenu();
              }}
            >
              Connect wallet
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;