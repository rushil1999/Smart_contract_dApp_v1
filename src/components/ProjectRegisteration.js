import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { requestAccount } from '../utils/eWallet';
import ProjectPool from '../contracts/ProjectPool.sol/ProjectPool.json';
import { PROJECT_POOL_ADDRESS } from '../utils/contractAddresses';
import {registerProject} from '../services/projectRegisterationService';


const ProjectRegisteration = (props) => {

  const { web3 } = props;

  const [contractState, setContractState] = useState();
  const [projectState, setProjectState] = useState({});
  const [loading, setLoading] = useState(true);

  const init = () => {
    const contract = new web3.eth.Contract(ProjectPool.abi, PROJECT_POOL_ADDRESS);
    // setContractState(contract);
    setContractState(contract); //async
    // console.log(contractState);
  }

  const handleFormFieldChange = e => {
    // console.log(e.target.value);
    setProjectState({
      ...projectState,
      [e.target.name]: e.target.value
    })
  };

  const handleProjectRegisteration = async () => {
    console.log(projectState);
    setLoading(true);
    const { userAccount } = await requestAccount();
    // const { name, description, link, unit, value } = projectState;
    console.log(contractState, userAccount[0]);
    console.log('Project State 1', projectState, contractState.methods, parseInt(value));
    const response = await registerProject(contractState, projectState, userAccount[0]);
    console.log(response);
    // const newContractProjectAddress = await contractState.methods.addNewProject(userAccount[0], name, description, link, unit, value).send({ from: userAccount[0] });
    // console.log('Project State 2', projectState);
    // console.log('New Txn Response', response);
    setLoading(false);
  }

  useEffect(()=>{
    init();
  },[])

  const { name, description, link, value, unit } = projectState;
  return (


    <Card border="info" style={{paddingTop: "15px"}}>
      <Card.Header>Register Your Project</Card.Header>
      <Card.Body>
        {/* <Card.Title>Special title treatment</Card.Title> */}
        <Card.Text>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="input" placeholder="Enter Name of the organization"
                defaultValue={name}
                onChange={handleFormFieldChange}
                name={"name"} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control type="input" placeholder="Description"
                defaultValue={description}
                onChange={handleFormFieldChange}
                name={"description"}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Value you need for your project</Form.Label>
              <Form.Control type="number" placeholder="Value"
                defaultValue={value}
                onChange={handleFormFieldChange}
                name={"value"}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Crupt Unit in which you need for the project </Form.Label>
              <Form.Control type="input" placeholder="Unit"
                defaultValue={unit}
                onChange={handleFormFieldChange}
                name={"unit"}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Link to your project</Form.Label>
              <Form.Control type="input" placeholder="link"
                defaultValue={link}
                onChange={handleFormFieldChange}
                name={"link"}
              />
            </Form.Group>

          </Form>

        </Card.Text>
        <Button
          variant="primary"
          onClick={handleProjectRegisteration}>
          Submit
        </Button>
      </Card.Body>
      {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
    </Card>
  )
}
export default ProjectRegisteration;