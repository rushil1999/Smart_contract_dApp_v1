import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { requestAccount } from '../utils/eWallet';
import ProjectPool from '../contracts/ProjectPool.sol/ProjectPool.json';
import { PROJECT_POOL_ADDRESS } from '../utils/contractAddresses';
import {registerProject} from '../services/projectRegisterationService';
import {useNavigate} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { INTERNAL_SERVER_ERROR_MESSAGE, PROJECT_REGISTERED_SUCCESS_MESSAGE } from '../utils/messageUtils';


const ProjectRegisteration = (props) => {

  const { web3 } = props;

  const [contractState, setContractState] = useState();
  const [projectState, setProjectState] = useState({});
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    messageType: ""
  })
  const navigator = useNavigate();

  const init = () => {
    const contract = new web3.eth.Contract(ProjectPool.abi, PROJECT_POOL_ADDRESS);
    setContractState(contract); //async
    setLoading(false)
  }

  const handleFormFieldChange = e => {
    setProjectState({
      ...projectState,
      [e.target.name]: e.target.value
    })
  };

  const handleProjectRegisteration = async () => {
    console.log(projectState, contractState);
    setLoading(true);
    const userAccount  = await requestAccount();
    // const { name, description, link, unit, value } = projectState;
    // console.log(contractState, userAccount[0]);
    // console.log('Project State 1', projectState, contractState.methods, parseInt(value));
    const serviceResponse = await registerProject(contractState, projectState, userAccount[0]);
    // console.log(serviceResponse);
    if(serviceResponse.success === true){
      setNotification({
        ...notification,
        show: true,
        message: PROJECT_REGISTERED_SUCCESS_MESSAGE,
      });
      setLoading(false);
      redirectToGrid();
    }
    else{
      setNotification({
        ...notification,
        show: true,
        message: INTERNAL_SERVER_ERROR_MESSAGE
      });
    }
  }

  const redirectToGrid = () => {
    setTimeout(()=>navigator(`/grid`), 3000);
  }

  useEffect(()=>{
    init();
  },[])

  const { name, description, link, value, unit } = projectState;
  return (
    <>
    {!loading && (
      <Card border="info" style={{paddingTop: "15px"}}>
        <Card.Header>Register Your Project</Card.Header>
        <Card.Body>
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
        <Modal 
          show={notification.show} 
          onHide={()=>setNotification({...notification, show: false})}
          enforceFocus={false}
        >
          <Modal.Body closeButton>
            <p>{notification.message}</p>
          </Modal.Body>
        </Modal>
      </Card>
    )}
    </>
  )
}
export default ProjectRegisteration;