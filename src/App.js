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
import PartyGrid from './components/PartyGrid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import {requestAccount} from './utils/eWallet';

function App() {

  const [cryptoState, setCryptoState] = useState();
  const [userAccount, setUserAccount] = useState();
  const [loading, setLoading] = useState(true);

  const setupWallet = async () => {
    setLoading(true);
    const {userAccount, web3} = await requestAccount();
    setUserAccount(userAccount);
    setCryptoState(web3);
    setLoading(false)
    // console.log('Running Meta Mask');

    // let provider = window.ethereum;
    // if(typeof provider !== 'undefined'){
    //   console.log(provider);
    //   provider
    //     .request({method:'eth_requestAccounts'})
    //     .then((account)=>{
    //       console.log('Accounts', account);
    //       setUserAccount(account);
    //       const web3 = new Web3(provider);
    //       setCryptoState(web3);
    //       setLoading(false);
    //     })
    //     .catch((err)=>{
    //       console.log(err);
    //     });
  }

  useEffect(()=>{
    setupWallet();
  }, [])


  return (
    <>
    {!loading && (
      <>
      <Container fluid>
      <Row>
        <Col>
        <p style={{}}></p>
        Decentralized Charity Application</Col>
      </Row>
      </Container>
      <Router>
        <Routes>
          <Route path="/" element={<UserAccount web3={cryptoState} account={userAccount}/>}/>
          {/* <Route path="/ticket/:id" element={<TicketDetails />}/> */}
          <Route path="/grid" element={<PartyGrid web3={cryptoState} account={userAccount}/>}/>
        </Routes>
      </Router>
      </>
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
