import React, {useState} from  'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { requestAccount } from '../utils/eWallet';


const ProjectRegisteration = (props) => {

  const {contractState, account} = props;

  const [projectState, setProjectState] = useState();
  const [loading, setLoading] = useState(true);

  const {name, link, cause} = projectState;

  const handleFormFieldChange = e => {
    // console.log(e.target.value);
    setProjectState({
        ...projectState,
        [e.target.name]: e.target.value
      })
    };

    const registerProject = async () => {
      console.log(projectState);
      setLoading(true);
      const { userAccount } = await requestAccount();
      const { name, description, link, unit, valueRequired } = projectState;
      console.log(contractState, account);
      const newContractPartyAddress = await contractState.methods
        .addNewProject(userAccount[0], name, description, link, unit, valueRequired)
        .send({ from: account[0] });
      console.log('New Contract Address', newContractPartyAddress);
      setLoading(false);
    }

  return(
    <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="input" placeholder="Enter Name of the organization" 
              defaultValue={name} 
              onChange={handleFormFieldChange}
              name={"name"}/>
            <Form.Text className="text-muted">
              Lenders will be able .
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cause</Form.Label>
            <Form.Control type="input" placeholder="Cause" 
              defaultValue={cause}
              onChange={handleFormFieldChange}
              name={"cause"}
            />
          </Form.Group>

          <Button 
            variant="primary" 
            onClick={registerProject}>
            Submit
          </Button>
    </Form>
  )
}