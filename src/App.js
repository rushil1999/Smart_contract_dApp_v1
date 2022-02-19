import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import UserAccount from './components/UserAccount';
import Web3 from 'web3';

function App() {

  const [cryptoState, setCryptoState] = useState();
  const [userAccount, setUserAccount] = useState();
  const [loading, setLoading] = useState(true);

  const requestAccount = async () => {
    setLoading(true);
    console.log('Running Meta Mask');
    // const address = await window.ethereum.request({method: 'eth_requestAccounts'});
    // console.log(address[0]); 

    let provider = window.ethereum;
    if(typeof provider !== 'undefined'){
      console.log(provider);
      provider
        .request({method:'eth_requestAccounts'})
        .then((account)=>{
          console.log('Accounts', account);
          setUserAccount(account);
          const web3 = new Web3(provider);
          setCryptoState(web3);
          setLoading(false);
        })
        .catch((err)=>{
          console.log(err);
        });
    }

    
    
  }

  useEffect(()=>{
    requestAccount();
  }, [])


  return (
    <>
    {!loading && (
      <Router>
        <Routes>
          <Route path="/" element={<UserAccount web3={cryptoState} account={userAccount}/>}/>
          {/* <Route path="/ticket/:id" element={<TicketDetails />}/> */}
        </Routes>
      </Router>
    )}
    
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
