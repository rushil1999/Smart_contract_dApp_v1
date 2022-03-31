import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Web3 from 'web3';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectRegisteration from './components/ProjectRegisteration';
import ProjectPayment from './components/ProjectPayment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import {getWeb3} from './utils/eWallet';

function App() {

  const [cryptoState, setCryptoState] = useState();
  const [loading, setLoading] = useState(true);

  const setupWallet = () => {
    setLoading(true);
    const web3 = getWeb3();
    console.log(web3);
    setCryptoState(web3);
    setLoading(false)
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
        <Navbar style={{position: "static", width: "100%", marginBottom: "20px"}}
          bg="dark" 
          variant="dark" 
          fixed="top"
        >
          <Container className="text-center">
            <Navbar.Brand >
              Crowd Funding
            </Navbar.Brand>
            <br/>
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Col style={{paddingLeft:"5px", paddingRight:"5px"}}>
        <Router>
          <Routes>
            <Route path="/register" element={<ProjectRegisteration web3={cryptoState} />}/>
            <Route path="/project/:id" element={<ProjectPayment web3={cryptoState}  />}/>
            <Route path="/grid" element={<ProjectsGrid web3={cryptoState} />}/>
          </Routes>
        </Router>
        </Col>
      </Row>
      </Container>
     
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
