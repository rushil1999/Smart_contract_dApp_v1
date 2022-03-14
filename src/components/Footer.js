import React from "react";
import { Navbar, Container } from "react-bootstrap";

const IFooter = () => {
  return (
    <>
      <Navbar expand='lg' variant='dark' bg='dark' sticky='bottom'>
        <Container className='d-flex justify-content-center'>
          <Navbar.Brand href='#'>
            Copright &#169; 2022 CrowdFunDapp. All rights reserved.
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default IFooter;
