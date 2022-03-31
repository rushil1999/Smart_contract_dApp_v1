import React, { useEffect, useState } from 'react';
import ProjectPool from '../contracts/ProjectPool.sol/ProjectPool.json';
import { PROJECT_POOL_ADDRESS } from '../utils/contractAddresses';
import ProjectTile from './ProjectTile';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProjectsGrid = props => {

  const [contractState, setContractState] = useState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({
    name: '',
    description: '',
    link: '',
  });
  const [projectsCount, setProjectsCount] = useState(0);
  // const [partyUser, setPartyUser] = useState();
  const { web3 } = props;

  const init = () => {
    const contract = new web3.eth.Contract(ProjectPool.abi, PROJECT_POOL_ADDRESS);
    // setContractState(contract);
    setContractState(contract); //async
    // console.log(contractState);
  }

  const fetchProjectsCount = async () => {
    console.log('FETCHING Projects');
    setLoading(true);
    console.log(contractState,);
    if (contractState) {
      const count = await contractState.methods.getTotalProjects().call();
      console.log('Final Projects count', count);
      setProjectsCount(count);
    }
    setLoading(false);
  }

  const fetchProjects = async () => {
    console.log('Fetching projects');
    const retreivedProjects = [];
    setLoading(true);
    if(contractState){
      console.log(projectsCount);
      for(var i =0;i<projectsCount;i++){
        const project = await contractState.methods.getProjectDetails(i).call();
        console.log('Fetched Party', project);
        const {name, description, link} = project;
        const retreivedParty = {
          index: i,
          name,
          description, 
          link, 
        }
        retreivedProjects.push(retreivedParty);
      }
      setProjects(retreivedProjects);
      setLoading(false);
    }
  }


  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    contractState && fetchProjectsCount();
  }, [contractState])

  useEffect(()=>{
    console.log("About to fetch");
    projectsCount>0 && fetchProjects();
  }, [projectsCount])

  console.log('Before rendering', loading, projectsCount, projects);
  return (
    <React.Fragment>
      {!loading && ( 
        <>
          
          <h1 style={{textAlign:"center"}}>
            Our Projects
          </h1>
          <Container>
            <Row>
              <Col lg={true}>
                {projectsCount> 0 && (
                  projects.map((e)=>{
                    return(
                      <ProjectTile key={e.index} projectDetails={e} contractState={contractState}/>
                    )
                  })
                )}
              </Col>
              
            </Row>
             
          </Container>
        </>
      )}

    </React.Fragment>
  );
}

export default ProjectsGrid;
