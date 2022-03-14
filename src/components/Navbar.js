import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const INavbar = ({ user }) => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        bg='dark'
        variant='dark'
        sticky='top'
      >
        <Container>
          <Navbar.Brand href='/'>CrowdFundApp</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/register'>Register</Nav.Link>
              <Nav.Link href='#'>Donate</Nav.Link>
              <Nav.Link href='#'>Donations</Nav.Link>
              <Navbar.Text className='truncate'>
                Hello, User: {user}
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default INavbar;
