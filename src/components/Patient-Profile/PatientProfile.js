import { Container, Row, Col } from "react-bootstrap";
import ConditionsInfo from "./ConditionsInfo/ConditionsInfo";
import BasicInfo from "./BasicInfo";
import VisitsList from "./VisitsList/VisitsList";
import classes from './PatientProfile.module.css';

const PatientProfile = () => {
    console.log('patientProfile')
    return (
        <Container fluid className={classes.patientProfile}>
            <BasicInfo />
            <ConditionsInfo/>
            <VisitsList/>
        </Container >
    );
}

export default PatientProfile;