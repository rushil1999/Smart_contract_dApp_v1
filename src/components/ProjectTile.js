import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

const ProjectTile = props => {
  const { name, description, link, index} = props.projectDetails;
  const navigator = useNavigate();


  const redirectToPayment = () => {
    navigator(`/project/${index}`)
  }

  return(
    <React.Fragment>
      <Card className="text-center">
        <Card.Header>{name}</Card.Header>
        <Card.Body>
          <Card.Title>{description}</Card.Title>
          <Button variant="success" onClick={redirectToPayment}>Contribute</Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default ProjectTile;