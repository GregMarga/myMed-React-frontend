import classes from './Atomiko.module.css'
import { Container, Row, Col } from 'react-bootstrap'
import Conditions from '../../../Patient-Details-Pages/History/Atomiko/Conditions';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../context/auth-context';
import { useHttpClient } from '../../../../hooks/http-hook';
// import {PatientContext} from '../../../context/patient-context'


const Atomiko = (props) => {
    const [conditionsList, setConditionsList] = useState([]);
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
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

    const addConditionHandler = async (condition) => {
      
        setConditionsList((prevState) => {
            return [...prevState, condition];
        })

        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/630ce238394ce3043ab038c8/conditions`, 'POST',
                JSON.stringify({
                    name: condition.name,
                    state: condition.state,
                    dateOfDiagnosis: condition.dateOfDiagnosis,
                    dateOfHealing: condition.dateOfHealing,
                    _id: condition._id
                })
                , {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                });
 
        } catch (err) { }
    }


    const removeConditionHandler = async (conditionIdToDelete) => {
        setConditionsList((prevState) => {
            return prevState.filter(condition => {
                return condition._id !== conditionIdToDelete
            })
        })
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/630ce238394ce3043ab038c8/conditions/${conditionIdToDelete}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });
           

        } catch (err) { }
       
    }

    return (
        <Container>
            <Conditions conditionsList={conditionsList} setConditionsList={setConditionsList} addConditionHandler={addConditionHandler} removeConditionHandler={removeConditionHandler} />
        </Container>
    );

}

export default Atomiko;