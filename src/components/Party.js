import React, {useEffect, useState} from 'react';

const Party = props => {
  const [partyDetails, setPartyDetails] = useState({});

  const fetchParyDetails = async (index) => {
    const {contractState, userAccount} = props;
    console.log(contractState);
    const party = await contractState.methods.getPartyDetails(index).call({value: userAccount});
    setPartyDetails(party);
    console.log(party)
  }

  useEffect(()=>{
    const {index}= props;
    fetchParyDetails(index);
  }, [])

  return(
    <React.Fragment>
      <p>Name: {partyDetails.name}</p>
      <p>Cause: {partyDetails.cause}</p>
      <p>Link: {partyDetails.link}</p>
    </React.Fragment>
  );
}

export default Party;