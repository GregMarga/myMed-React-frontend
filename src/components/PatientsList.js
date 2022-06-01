import classes from './PatientsList.module.css';
import {  Container} from 'react-bootstrap';
import PatientsListItems from './PatientsListItem';
import Card from './UI/Card';


const PatientsList=(props)=>{

    return (
        <Container>
                <div className={classes.patientsList}>
                <Card >                    
                   
                        {props.patients.map((patient)=>(
                        <PatientsListItems 
                        key={patient.id}
                        id={patient.id}
                        sirname={patient.sirname}
                        name={patient.name}
                        fathersName={patient.fathersName}
                        age={patient.age}
                        tel={patient.tel}
                        amka={patient.amka}
                        />
                        
                        ))} 
                                       
                
            </Card>
            </div>
        </Container>
    );
}

export default PatientsList;