import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

const Party = props => {
  const { e, userAccount, contract } = props;
  const [partyDetails, setPartyDetails] = useState({});
  const [contractState, setContractState] = useState({});
  const [user, setUser] = useState("");

  useEffect(() => {
    console.log("props", props);
    setPartyDetails(e);
    setContractState(contract);
    setUser(userAccount);
    console.log("contract", contractState);
    console.log("user", user);
  }, []);

  return (
    <>
      <Card>
        <Card.Header as='h5'>{partyDetails.name}</Card.Header>
        <Card.Body>
          <Card.Title>{partyDetails.link}</Card.Title>
          <Card.Text>{partyDetails.cause}</Card.Text>
          <Button variant='primary' href='/'>
            Go somewhere
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Party;
