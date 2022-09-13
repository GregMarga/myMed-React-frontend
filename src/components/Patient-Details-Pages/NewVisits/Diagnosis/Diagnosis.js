import { Container, Row, Col } from "react-bootstrap";
import Card from '../../../UI/Card'
import classes from './Diagnosis.module.css'
import { useContext, useState, useEffect } from "react";
import DiagnosisList from "./DiagnosisList";
import ConditionsHeader from '../../History/Atomiko/ConditionsHeader'
import DiagnosisForm from "./DiagnosisForm";
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";
import ErrorModal from "../../../UI/ErrorModal";
import LoadingSpinner from "../../../UI/LoadingSpinner";



const Diagnosis = (props) => {
    const [addDiagnosis, setAddDiagnosis] = useState(false);
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { error, isLoading, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchDiagnosis = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/visit/${patientContext.visitId}/diagnosis`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                props.dispatch({ type: 'loadDiagnosisList', payload: { loadedDiagnosisList: responseData } })
                props.dispatch({ type: 'oldDiagnosis', payload: { oldDiagnosis: true } })


            } catch (err) { console.log(err) }

        };
        if (!!patientContext.visitId && patientContext.visitId !== 'new') {
            fetchDiagnosis();
        }

    }, [patientContext.visitId, sendRequest]);


    const openAddForm = (event) => {
        setAddDiagnosis(true);
        props.dispatch({ type: 'touchDiagnosis', payload: { touchDiagnosisForm: true } })

    }

    const addDiagnosisHandler = async (newDiagnosis) => {
        console.log('add')
        try {
            props.dispatch({ type: 'addDiagnosisList', payload: { diagnosis: newDiagnosis } })
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/visit/${patientContext.visitId}/diagnosis`, 'POST',
                JSON.stringify({
                    _id: newDiagnosis._id,
                    name: newDiagnosis.name,
                    status: newDiagnosis.status,
                    dateOfDiagnosis: newDiagnosis.dateOfDiagnosis,
                    dateOfHealing: newDiagnosis.dateOfHealing
                })
                , {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
        } catch (err) { console.log(err) }
    }

    const removeDiagnosisHandler = async (diagnosisIdToDelete) => {
        let diagnosisList = props.state.diagnosisList.filter(diagnosis => {
            return diagnosis._id !== diagnosisIdToDelete
        })

        try {
            props.dispatch({ type: 'removeDiagnosisList', payload: { diagnosisList: diagnosisList } })

            await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/visit/${patientContext.visitId}/diagnosis/${diagnosisIdToDelete}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });
        } catch (err) { }


    }
    const editDiagnosisHanlder = async (addedDiagnosis, diagnosisIdtoUpdate) => {
        let tempList = props.state.diagnosisList;
        tempList = tempList.map(diagnosis => {
            if (diagnosis._id === diagnosisIdtoUpdate) {
                return diagnosis = addedDiagnosis
            } else { return diagnosis = diagnosis }
        })
        try {
            props.dispatch({ type: 'editDiagnosisList', payload: { diagnosisList: tempList } })
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/visit/${patientContext.visitId}/diagnosis/${diagnosisIdtoUpdate}`, 'PATCH',
                JSON.stringify({
                    status: addedDiagnosis.length,
                    dateOfDiagnosis: addedDiagnosis.dateOfDiagnosis,
                    dateOfHealing: addedDiagnosis.dateOfHealing
                })
                , {
                    Authorization: 'Bearer ' + auth.token,
                    'Content-Type': 'application/json'
                });
        } catch (err) { }
    }



    return (
        <Container >
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Card className={classes.conditionsCard}>
                {isLoading && <LoadingSpinner />}
                <ConditionsHeader />

                {addDiagnosis && <DiagnosisForm setAddDiagnosis={setAddDiagnosis} addDiagnosisHandler={addDiagnosisHandler} />}
                <DiagnosisList editDiagnosisHanlder={editDiagnosisHanlder} removeDiagnosisHandler={removeDiagnosisHandler} loadedDiagnosisList={props.loadedDiagnosisList} touchForm={props.state.touchDiagnosisForm} oldDiagnosis={props.state.oldDiagnosis} dispatch={props.dispatch} addDiagnosis={addDiagnosis} diagnosisList={props.diagnosisList} />

                <Row>
                    <Col>
                        {!addDiagnosis && <button className={classes.addCondition} onClick={openAddForm}>Προσθήκη Διάγνωσης</button>}
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default Diagnosis;