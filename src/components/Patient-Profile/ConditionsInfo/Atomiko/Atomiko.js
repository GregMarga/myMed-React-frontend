import classes from './Atomiko.module.css'
import { Container, Row, Col } from 'react-bootstrap'
import Conditions from '../../../Patient-Details-Pages/History/Atomiko/Conditions';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../context/auth-context';
import { useHttpClient } from '../../../../hooks/http-hook';
// import {PatientContext} from '../../../context/patient-context'


const Atomiko = (props) => {
    const [conditionsList, setConditionsList] = useState([]);
    const {sendRequest,isLoading,error,clearError}=useHttpClient();
    const auth=useContext(AuthContext);
    // const patientContext=useContext(PatientContext)

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/630ce238394ce3043ab038c8/conditions`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                console.log(responseData)
                setConditionsList(responseData.conditionsList)
            } catch (err) { }

        };
        fetchHistory();
    }, []);
    return (
        <Container>
            <Conditions conditionsList={conditionsList} setConditionsList={setConditionsList} />
        </Container>
    );

}

export default Atomiko;