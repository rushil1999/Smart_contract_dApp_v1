import React, {useState, useEffect} from 'react';
import CharityPool from '../contracts/CharityPool.sol/CharityPool.json';

const UserAccount = props =>{

  const charityPoolAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

  const [parties, setParties] = useState();

  console.log('Accounts in User Account', props);
  console.log(CharityPool);
  const{ web3, account } = props;

  const fetchPartiesFromContracts = async () =>{
    const contract = new web3.eth.Contract(CharityPool.abi, charityPoolAddress);
    console.log(contract); 
    console.log('User Address', account[0]);
    const contractAddress = await contract.methods.getCurrentContractAddress().call({from: account[0]});
    console.log(contractAddress);

    const value = await contract.methods.addNewParty(account[0], "A", "B", "C").call({from: account[0]});
    // const parties = await contract.methods.totalEntries().call();
    const partyAddress = await contract.methods.getPartyAddress(0).call({from: account[0]});
    const partyDetails = await contract.methods.getPartyDetails(0).call({from: account[0]});
    const partyBalance = await contract.methods.getPartyBalance(0).call({from: account[0]});
    console.log(partyAddress, partyDetails, partyBalance, value);

    const a = await contract.methods.donate(0, "ether").send({from: account[0], value: 1000000000000000000});
    console.log(a);
    // console.log(value, parties);
  }

  useEffect(()=>{
    fetchPartiesFromContracts()
    

  },[])

  return(
    <>
      <div>
        Hello User
      </div>
    </>
  );
}

export default UserAccount;