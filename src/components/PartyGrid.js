import React, { useEffect, useState, useCallback } from 'react';
import CharityPool from '../contracts/CharityPool.sol/CharityPool.json';
import { CHARITY_POOL_ADDRESS } from '../utils/contractAddresses';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { requestAccount } from '../utils/eWallet';
import Party from './Party';

const PartyGrid = props => {

  const [contractState, setContractState] = useState();
  const [parties, setParties] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [party, setParty] = useState({
    name: '',
    cause: '',
    link: ''
  });
  const [partyCount, setPartyCount] = useState(0);
  const [partyUser, setPartyUser] = useState();
  const { web3, account } = props;

  const init = () => {
    console.log('BEGIN')
    const contract = new web3.eth.Contract(CharityPool.abi, CHARITY_POOL_ADDRESS);
    console.log(contract);
    // setContractState(contract);
    setContractState(contract); //async
    // console.log(contractState);
  }

  const fetchPartiesCount = async () => {
    console.log('FETCHING PARTIES');
    setLoading(true);
    console.log(contractState, account[0]);
    if (contractState) {
      console.log(contractState.methods);
      const partiesCount = await contractState.methods.getTotalParties().call({ from: account[0] });
      console.log(partiesCount);
      setPartyCount(partiesCount);
    }
    setLoading(false);
  }

  const handleFormFieldChange = e => {
    // console.log(e.target.value);
    setParty({
      ...party,
      [e.target.name]: e.target.value
    })
  }
  const handleRegisterButton = () => {
    setOpenForm(true);
  }

  const registerParty = async () => {
    console.log(party);
    setLoading(true);
    const { userAccount } = await requestAccount();
    const { name, cause, link } = party;
    console.log(contractState, userAccount);
    const newContractPartyAddress = await contractState.methods.addNewParty(userAccount[0], name, cause, link).send({ from: userAccount[0] });
    console.log('New Contract Address', newContractPartyAddress);
    parties.push({
      [partyCount + 1]: {
        name,
        cause,
        link,
        contractAddress: newContractPartyAddress,
        index: partyCount + 1,
      }
    })
    setParties(parties);
    setPartyCount(partyCount + 1);
    console.log(parties);
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    contractState && fetchPartiesCount();
  }, [contractState])


  return (
    <React.Fragment>
      {!loading && ( 
        <>
          <Button 
          variant="primary" 
          size="lg"
          onClick={handleRegisterButton}
          >
          Register
          </Button>
          <React.Fragment>
          {openForm && (
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="input" placeholder="Enter Name of the organization" 
              defaultValue={party.name} 
              onChange={handleFormFieldChange}
              name={"name"}/>
            <Form.Text className="text-muted">
              Lenders will be able .
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cause</Form.Label>
            <Form.Control type="input" placeholder="Cause" 
              defaultValue={party.cause}
              onChange={handleFormFieldChange}
              name={"cause"}
            />
          </Form.Group>

          <Button 
            variant="primary" 
            onClick={registerParty}>
            Submit
          </Button>
          </Form>
          )}
          </React.Fragment>
          <React.Fragment>
            {partyCount> 0 && (
              parties.map((e, index)=>{
                return(
                  <Party index={index} userAccount={account} contract={contractState}/>
                )
              })
            )} 
          </React.Fragment>
        </>
      )}

    </React.Fragment>
  );
}

export default PartyGrid;
