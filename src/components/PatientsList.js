import classes from './PatientsList.module.css';
import { Container } from 'react-bootstrap';
import PatientsListItems from './PatientsListItem';
import Card from './UI/Card';


const PatientsList = (props) => {

    return (
        <Container>
            <div className={classes.patientsList}>
                <Card >

                    {props.patients.map((patient) => (
                        <PatientsListItems
                            onDelete={props.onDelete}
                            onEdit={props.onEdit}
                            key={patient._id}
                            id={patient._id}
                            sirname={patient.sirname}
                            name={patient.name}
                            fathersName={patient.fathersName}
                            age={patient.age}
                            tel={patient.tel}
                            amka={patient.amka}
                        />

                    ))}
                    {(props.patients.length === 0) && <Row>
                        <Col className='text-center'>List is empty,add a patient.</Col>
                    </Row>}


                </Card>
            </div>
        </Container>
    );
}

export default PatientsList;