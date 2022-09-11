import { Fragment, useContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Card from "../../../UI/Card";
import Allergies from "../../../Patient-Details-Pages/History/Atomiko/Allergies/Allergies";
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";
import classes from './AllergiesInfo.module.css'


const AllergiesInfo = (props) => {
    // const [allergiesList, setAllergiesList] = useState([])
    // const auth = useContext(AuthContext);
    // const patientContext = useContext(PatientContext);
    // const { isLoading, error, clearError, sendRequest } = useHttpClient()


   
  

   
    return (
        <Container>
            {/* <Card className={classes.allergiesCard}> */}
                <Allergies  profil/>
            {/* </Card> */}
        </Container>
    )
}

export default AllergiesInfo;