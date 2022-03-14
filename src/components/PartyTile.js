import React from 'react';

const PartyTile = props => {

  // const fetchParyDetails = async () => {
  //   const {partyDetails} = props;
  //   const {index} = partyDetails;
  //   // const partyAddress = await contractState.methods.getPartyAddress(index).call({from: account[0]});
  //   // const contractAddress = await contractState.methods.getContractAddress(index).call({from: account[0]});
  //   console.log('In Party Tile', index);
  // }



  const { name, cause, link} = props.partyDetails;

  return(
    <React.Fragment>
      <p>Name: {name}</p>
      <p>Cause: {cause}</p>
      <p>Link: {link}</p>
    </React.Fragment>
  );
}

export default PartyTile;