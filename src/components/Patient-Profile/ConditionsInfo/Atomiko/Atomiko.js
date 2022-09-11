import classes from './Atomiko.module.css'
import { Container, } from 'react-bootstrap'
import ErrorModal from '../../../UI/ErrorModal';
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

   

    return (
        <Container>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Conditions profil conditionsList={conditionsList}/>
        </Container>
    );

}

export default Atomiko;