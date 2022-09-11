import { Fragment, useContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Card from "../../../UI/Card";
import Klironomiko from '../../../Patient-Details-Pages/History/Klironomiko/Klironomiko';
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";
import classes from './Klironomiko.module.css'



const AllergiesInfo = (props) => {
    // const [cleronomicalList, setCleronomicalList] = useState([])
    // const auth = useContext(AuthContext);
    // const patientContext = useContext(PatientContext);
    // const { isLoading, error, clearError, sendRequest } = useHttpClient()
    
    return (
        <Container>
                <Klironomiko  profil/>
        </Container>
    )
}

export default AllergiesInfo;