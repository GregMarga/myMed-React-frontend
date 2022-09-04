import { Container, Row, Col } from "react-bootstrap";
import Card from '../../../UI/Card'
import classes from './Diagnosis.module.css'
import { useState } from "react";
import DiagnosisList from "./DiagnosisList";
import ConditionsHeader from '../../History/Atomiko/ConditionsHeader'
import DiagnosisForm from "./DiagnosisForm";



const Diagnosis = (props) => {
    const [addDiagnosis, setAddDiagnosis] = useState(false);


    const openAddForm = (event) => {
        setAddDiagnosis(true);
        props.dispatch({ type: 'touchDiagnosis', payload: { touchDiagnosisForm: true } })

    }

    const addDiagnosisHandler = (newDiagnosis) => {
        props.dispatch({ type: 'addDiagnosisList', payload: { diagnosis: newDiagnosis } })

    }
    const removeDiagnosisHandler = (diagnosisIdToDelete) => {
        let diagnosisList = props.state.therapeiaList.filter(diagnosis => {
            return diagnosis._id !== diagnosisIdToDelete
        })

        props.dispatch({ type: 'removeDiagnosisList', payload: { diagnosisList: diagnosisList } })
    }
    const editDiagnosisHanlder = (addedDiagnosis, diagnosisIdtoUpdate) => {
        let tempList = props.state.diagnosisList;
        tempList = tempList.map(diagnosis => {
            if (diagnosis._id, diagnosisIdtoUpdate) {
                return diagnosis = addedDiagnosis
            }
        })
        props.dispatch({type:'editDiagnosisList',payload:{diagnosisList: tempList}})
    }
    


    return (
        <Container >

            <Card className={classes.conditionsCard}>
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