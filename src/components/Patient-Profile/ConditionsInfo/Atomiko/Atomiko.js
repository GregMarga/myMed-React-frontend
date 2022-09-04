import classes from './Atomiko.module.css'
import { Container, } from 'react-bootstrap'
import ErrorModal from '../../../UI/ErrorModal'
import Conditions from '../../../Patient-Details-Pages/History/Atomiko/Conditions';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../context/auth-context';
import { useHttpClient } from '../../../../hooks/http-hook';
import { PatientContext } from '../../../../context/patient-context';


const Atomiko = (props) => {
    const [conditionsList, setConditionsList] = useState([]);
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext)


    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setConditionsList(responseData.conditionsList)
            } catch (err) { }

        };
        if (!!patientContext.patientId) {
            fetchHistory();
        }
    }, [patientContext.patientId, sendRequest]);

    const addConditionHandler = async (condition) => {

        setConditionsList((prevState) => {
            return [...prevState, condition];
        })

        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions`, 'POST',
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

        } catch (err) { console.log(err) }
    }


    const removeConditionHandler = async (conditionIdToDelete) => {
        setConditionsList((prevState) => {
            return prevState.filter(condition => {
                return condition._id !== conditionIdToDelete
            })
        })
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/${conditionIdToDelete}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });


        } catch (err) { }

    }
    const editConditionHandler = async (addedCondition, conditionIdtoUpdate) => {
        setConditionsList(prevState => {
            return prevState.map(condition => {
                if (condition._id === conditionIdtoUpdate) {
                    return condition = addedCondition
                } else return condition = condition
            })
        })
        console.log(addedCondition.status)
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/${conditionIdtoUpdate}`, 'PATCH',
                JSON.stringify({
                    status: addedCondition.status,
                    dateOfDiagnosis: addedCondition.dateOfDiagnosis,
                    dateOfHealing: addedCondition.dateOfHealing
                })
                , {
                    Authorization: 'Bearer ' + auth.token,
                    'Content-Type': 'application/json'
                });

        } catch (err) { console.log(err) }
    }

    return (
        <Container>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Conditions profil conditionsList={conditionsList} setConditionsList={setConditionsList} addConditionHandler={addConditionHandler} removeConditionHandler={removeConditionHandler} editConditionHandler={editConditionHandler} />
        </Container>
    );

}

export default Atomiko;