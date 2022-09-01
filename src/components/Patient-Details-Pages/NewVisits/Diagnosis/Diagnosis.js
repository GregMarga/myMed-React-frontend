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
        
    }

    const addDiagnosisHandler = (newDiagnosis) => {
        props.dispatch({ type: 'addDiagnosisList', payload: { diagnosis:  newDiagnosis} })
        // props.setDiagnosisList((prevState) => {
        //     return [...prevState, diagnosis];
        // })
        console.log(newDiagnosis);
    }


    return (
        <Container >

            <Card className={classes.conditionsCard}>
                <ConditionsHeader />

                {addDiagnosis && <DiagnosisForm setAddDiagnosis={setAddDiagnosis} addDiagnosisHandler={addDiagnosisHandler} />}
                <DiagnosisList loadedDiagnosisList={props.loadedDiagnosisList} oldDiagnosis={props.state.oldDiagnosis} dispatch={props.dispatch} addDiagnosis={addDiagnosis} diagnosisList={props.diagnosisList} />
                
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