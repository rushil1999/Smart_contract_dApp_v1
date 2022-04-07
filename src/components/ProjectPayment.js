import React, { useEffect, useState } from 'react';
import { PROJECT_POOL_ADDRESS } from '../utils/contractAddresses';
import ProjectPool from '../contracts/ProjectPool.sol/ProjectPool.json';
import {useLocation} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { payProject } from '../services/projectPaymentService';
import { getProjectDetails } from '../services/projectDetailsService';
import Form from 'react-bootstrap/Form';
import { convertEthToWei } from '../services/tokenConversionService';
import Modal from 'react-bootstrap/Modal';
import { INTERNAL_SERVER_ERROR_MESSAGE, TRANSFER_INTIATED_MESSAGE, TRANSFER_SUCCESSFULL_MESSAGE } from '../utils/messageUtils';
import {requestAccount} from '../utils/eWallet';

const ProjectPayment = props => {

  const [userAccount, setUserAccount] = useState();
  const [contractState, setContractState] = useState();
  const [projectState, setProjectState] = useState({
    name: '',
    description: '',
    unit: '',
    valueRequired: 0,
    link: '' ,
    currentBalance: 0
  });
  const [projectIndex, setProjectIndex] = useState();
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState({
    unit: "Ether",
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    messageType: ""
  })
  const {web3} = props;

  const location = useLocation();
  console.log(location.pathname);

  const getIdFromUrl = ()=>{
    const url = location.pathname.split("/");
    const index = parseInt(url[url.length-1]);
    setProjectIndex(index);
  }

  const init = () => {
    const contract = new web3.eth.Contract(ProjectPool.abi, PROJECT_POOL_ADDRESS);
    // setContractState(contract);
    setContractState(contract); //async
    // console.log(contractState);
  }

  const fetchProjectDetails = async () => {
    setLoading(true);
    const serviceResponse = await getProjectDetails(contractState, projectIndex);
    if(serviceResponse.success === true){
      const {name, link, description, unit, valueRequired, currentBalance} = serviceResponse;
      setProjectState({
        name, 
        link,
        description,
        unit, 
        valueRequired,
        currentBalance,
      });
      setLoading(false);
    }
    else{
      //TODO: Put Alert Service here
      console.log(serviceResponse.message);
    }
  }

  const handleFormFieldChange = (e) => {
    console.log(e.target.name, e.target.value);
    setPayment({
      ...payment,
      [e.target.name]: e.target.value
    });
  }

  const intiatePayment = async () => {
    //Get some more information
    const account = await requestAccount();
    setUserAccount(account);
    setShowPaymentForm(true);
    // payProject(contractState, projectIndex, "Eth");
  }

  const donate = async () => {
    let amount;
    console.log(payment);
    if(payment.unit === 'Ether'){
      console.log("Converting")
      amount = convertEthToWei(payment.amount);
    }
    else{
      amount = parseInt(payment.amount);
    }
    const serviceResponse = await payProject(contractState, projectIndex, amount, userAccount);
    if(serviceResponse.success ===  true){
      setNotification({
        ...notification,
        show: true,
        message: TRANSFER_SUCCESSFULL_MESSAGE,
      })
    }
    else{
      setNotification({
        ...notification,
        show: true,
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      })
    }
    
  }

  useEffect(()=>{
    getIdFromUrl();
  }, [])

  useEffect(()=>{
    init();
  },[projectIndex])

  useEffect(()=>{
    contractState && fetchProjectDetails();
  }, [projectIndex, contractState])

  const {name, description, link, unit, valueRequired} = projectState;
  return(
    <React.Fragment>
      {!loading && (
        <>
        <div style={{width: "70%", margin:"auto"}}>
        <Card className="text-center">
          <Card.Header>{name}</Card.Header>
          <Card.Body>
            <Card.Title>{description}</Card.Title>
            <Card.Text>
              Value Required: {valueRequired}
            </Card.Text>
            <Card.Text>
              Unit: {unit}
            </Card.Text>
          </Card.Body>
          <Button 
            variant="primary" 
            onClick={intiatePayment}
            style={{width: '50%', margin: 'auto', marginBottom:"5px"}}
          >
            Initiate Payment
          </Button>
        </Card>
        {showPaymentForm && (
          <>
          <div style={{paddingTop: "15px"}}>
          <Card className="text-center">
            <Card.Header>Payment Details</Card.Header>
            <Card.Body>
              <div style={{width: '90%', margin: 'auto'}}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Select 
                    aria-label="Default select example"
                    onChange={handleFormFieldChange}
                    name={"unit"}
                    defaultValue="Ether"
                  >
                    <option value="Ether">Ether</option>
                    <option value="wei">Wei</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="number" placeholder="Amount to Donate"
                      defaultValue={payment.amount}
                      onChange={handleFormFieldChange}
                      name={"amount"}
                  />
                </Form.Group>
              </Form>
              </div>
            </Card.Body>
            
          </Card>
          
          </div>
          <Button
            variant="success"
            style={{margin: 'auto', width: '50%'}}
            onClick={donate}
          >
            Pay
          </Button>
        </>
        )}
        </div>
        <Modal 
          show={notification.show} 
          onHide={()=>setNotification({...notification, show: false})}
          enforceFocus={false}
        >
          <Modal.Body closeButton>
            <p>{notification.message}</p>
          </Modal.Body>
        </Modal>
      </>
      )}
      
    </React.Fragment>
  );


}

export default ProjectPayment;