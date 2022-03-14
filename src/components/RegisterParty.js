import React, { useEffect, useState, useCallback } from "react";
import CharityPool from "../contracts/CharityPool.sol/CharityPool.json";
import { CHARITY_POOL_ADDRESS } from "../utils/contractAddresses";
import Button from "react-bootstrap/Button";
import { Container, Form, Row, Col } from "react-bootstrap";
import { requestAccount } from "../utils/eWallet";
import Party from "./Party";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/register-party.css";

const RegisterParty = props => {
  const [contractState, setContractState] = useState();
  const [parties, setParties] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [party, setParty] = useState({
    name: "",
    cause: "",
    link: "",
  });
  const [partyCount, setPartyCount] = useState(0);
  const { web3, account } = props;

  const init = () => {
    console.log("BEGIN");
    const contract = new web3.eth.Contract(
      CharityPool.abi,
      CHARITY_POOL_ADDRESS
    );
    console.log("contract init", contract);
    setContractState(contract); //async
  };

  const fetchParties = async () => {
    console.log("FETCHING PARTIES COUNT");
    setLoading(true);
    console.log(contractState, account[0]);
    const tparties = [];

    if (contractState) {
      try {
        const partiesCount = await contractState.methods
          .getTotalParties()
          .call({ from: account[0] });
        console.log(partiesCount);
        setPartyCount(partiesCount);
        for (let i = 0; i < partiesCount; i++) {
          let party = await contractState.methods
            .getPartyDetails(i)
            .call({ from: account[0] });
          tparties.push(party);
        }
        console.log("tparties", tparties[0].name);
        setParties(tparties);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  const handleFormFieldChange = e => {
    setParty({
      ...party,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegisterButton = () => {
    setOpenForm(!openForm);
  };

  const registerParty = async () => {
    setOpenForm(false);
    setLoading(true);
    const { userAccount } = await requestAccount();
    const { name, cause, link } = party;
    console.log(contractState, userAccount);
    const newContractPartyAddress = await contractState.methods
      .addNewParty(userAccount[0], name, cause, link)
      .send({ from: userAccount[0] });
    console.log("New Contract Address", newContractPartyAddress);
    parties.push({
      name,
      cause,
      link,
      contractAddress: newContractPartyAddress,
      index: partyCount + 1,
    });
    setParties(parties);
    setPartyCount(partyCount + 1);
    console.log("new parties ", parties);
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    contractState && fetchParties();
  }, [contractState]);

  return (
    <>
      <Navbar user={account} />
      <Container fluid>
        <Row className='mt-2'>
          <Col sm={12} className='d-flex justify-content-center'>
            <Button variant='dark' onClick={handleRegisterButton}>
              Register
            </Button>
          </Col>
        </Row>
        <Row className='justify-content-center mt-2'>
          <Col sm={12} md={6}>
            {openForm && (
              <Form className='register-form justify-content-center'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='input'
                    placeholder='Enter Name of the organization'
                    defaultValue={party.name}
                    onChange={handleFormFieldChange}
                    name={"name"}
                  />
                  <Form.Text className='text-muted'>
                    Lenders will be able .
                  </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Label>Cause</Form.Label>
                  <Form.Control
                    type='input'
                    placeholder='Cause'
                    defaultValue={party.cause}
                    onChange={handleFormFieldChange}
                    name={"cause"}
                  />
                </Form.Group>

                <Button variant='primary' onClick={registerParty}>
                  Submit
                </Button>
              </Form>
            )}
          </Col>
        </Row>
        <Row className='justify-content-center mt-2'>
          {!loading &&
            partyCount > 0 &&
            parties.map(e => {
              return (
                <Col xs={12} md={8} className='text-center'>
                  <Party e={e} userAccount={account} contract={contractState} />
                </Col>
              );
            })}
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default RegisterParty;
