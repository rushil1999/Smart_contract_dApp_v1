import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Web3 from "web3";
import RegisterParty from "./components/RegisterParty";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestAccount } from "./utils/eWallet";

function App() {
  const [cryptoState, setCryptoState] = useState();
  const [userAccount, setUserAccount] = useState();
  const [loading, setLoading] = useState(true);

  const setupWallet = async () => {
    setLoading(true);
    const { userAccount, web3 } = await requestAccount();
    setUserAccount(userAccount);
    setCryptoState(web3);
    setLoading(false);
  };

  useEffect(() => {
    setupWallet();
  }, []);

  useEffect(() => {
    window.ethereum.on("accountsChanged", function (accounts) {
      setUserAccount(accounts[0]);
      window.reload();
    });
  }, [userAccount]);

  return (
    <>
      {!loading && (
        <>
          <Router>
            <Routes>
              <Route
                path='/'
                element={<Dashboard web3={cryptoState} account={userAccount} />}
              />
              <Route
                path='/register'
                exact={true}
                element={
                  <RegisterParty web3={cryptoState} account={userAccount} />
                }
              />
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
