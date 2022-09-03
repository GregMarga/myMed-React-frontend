import { Container } from "react-bootstrap";
import ConditionsInfo from "./ConditionsInfo/ConditionsInfo";
import BasicInfo from "./BasicInfo";
import VisitsList from "./VisitsList/VisitsList";
import classes from './PatientProfile.module.css';
import { PatientContext } from "../../context/patient-context";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";


const PatientProfile = () => {
    const patientContext=useContext(PatientContext);
    const patientId = useParams().patientId

     useEffect(()=>{
        patientContext.createPatientId(patientId)
    },[patientId])


    return (
        <Container fluid className={classes.patientProfile}>
            <BasicInfo />
            <ConditionsInfo/>
            <VisitsList/>
        </Container >
    );
}

export default PatientProfile;