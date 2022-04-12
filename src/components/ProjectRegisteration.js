import React, { useEffect, useState } from 'react';
import { Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { requestAccount } from '../utils/eWallet';
import ProjectPool from '../contracts/ProjectPool.sol/ProjectPool.json';
import { PROJECT_POOL_ADDRESS } from '../utils/contractAddresses';
import {registerProject} from '../services/projectRegisterationService';
import {useNavigate} from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
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
    // setLoading(true);
    const userAccount  = await requestAccount();
    const serviceResponse = await registerProject(contractState, projectState, userAccount[0]);
    if(serviceResponse.success === true){
      setNotification({
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

      console.log('Set Notification');
    }
  }

  const redirectToGrid = () => {
    setTimeout(()=>navigator(`/grid`), 3000);
  }

  useEffect(()=>{
    init();
  },[])

  const { name, description, link, value, unit } = projectState;
  const {show, message} = notification
  return (
    <>
    {loading ? (

    <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
    </Spinner>
    ) : (
      <>
      <Card border="info" style={{paddingTop: "15px"}}>
        <Card.Header>Register Your Project</Card.Header>
        <Card.Body>
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

          <Button
            variant="primary"
            onClick={handleProjectRegisteration}>
            Submit
          </Button>
        </Card.Body>
        
      </Card>
      <ToastContainer className="p-3" position={'top-end'} delay={3000} autohide>
      <Toast 
        show={show} 
        onClose={()=>{console.log('closing notif'); setNotification({...notification, show:false})}}
        position={'top-end'}
      >
        <Toast.Header closeButton={true}>
          Notification  
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
      </ToastContainer>
      </>
    )}
    </>
  )
}
export default ProjectRegisteration;