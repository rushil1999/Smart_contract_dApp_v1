import React, { useEffect, useState } from 'react';
import { PROJECT_POOL_ADDRESS } from '../utils/contractAddresses';
import ProjectPool from '../contracts/ProjectPool.sol/ProjectPool.json';
import {useLocation} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { payProject } from '../services/projectPaymentService';

const ProjectPayment = props => {

  const [contractState, setContractState] = useState();
  const [projectState, setProjectState] = useState({
    name: '',
    description: '',
    unit: '',
    valueRequired: 0,
    link: '' 
  });
  const [projectIndex, setProjectIndex] = useState();
  const [loading, setLoading] = useState(true);
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
    try{
      const project = await contractState.methods.getProjectDetails(projectIndex).call();
      if(project){
        console.log(project);
        const {name, link, description, unit, valueRequired} = project;
        setProjectState({
          index: projectIndex,
          name, 
          description, 
          unit,
          link,
          valueRequired
        });
        setLoading(false);
      }
      else{
        console.log('Could Not Fetch Project');
      }
    }
    catch(e){
      console.log(e);
    }
  }

  const handlePayment = () => {
    //Get some more information
    payProject(contractState, projectIndex, "Eth");
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
        <Button variant="primary" onClick={handlePayment}>Initiate Payment</Button>
      </Card>
      )}
      
    </React.Fragment>
  );


}

export default ProjectPayment;