import React, { useState } from 'react';
import { ethers} from 'ethers';
import '../../src/Wallet.css';
const WalletCard = () => {

    const[errorMessage, setErrorMessage] = useState(null);
    const[defaultAccount, setDefaultAccount] = useState(null);
    const[UserBalance, setUserBalance] = useState(null);
    const[connButtonText, setConnButtonText] = useState('connect Wallet');
  
  const ConnectHandler = () => {

    if (window.ethereum) {
     window.ethereum.request({method: 'eth_requestAccounts'}).then(result => {
        accountChangedHandler(result[0]);

     })
    }
    else 
    setErrorMessage('Please install metamask');

  }
  
  const accountChangedHandler = (newAccount) => {

    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  }

  const getUserBalance = (address) => {
   window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']}).then(balance => {
    setUserBalance(ethers.utils.formatEther(balance));   })
  }
    return (
    <div className='Wallet'>
      <h4>Connecting React App with Metamask using window.ethereum methods</h4>   
     <button onClick={ConnectHandler}>{connButtonText}</button> 
      <div>
        <h3>Address:{defaultAccount}</h3>
  </div>
  <h3>Balance:{UserBalance}</h3>
    
    </div>
  )
}

export default WalletCard
