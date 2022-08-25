import { Container, Row, Col } from "react-bootstrap";
import Card from '../../../UI/Card'
import classes from './Diagnosis.module.css'
import { useState } from "react";
import DiagnosisList from "./DiagnosisList";
import ConditionsHeader from '../../History/Atomiko/ConditionsHeader'
import DiagnosisForm from "./DiagnosisForm";



const Diagnosis = (props) => {
    // const [diagnosisList, setDiagnosisList] = useState([]);
    const [addDiagnosis, setAddDiagnosis] = useState(false);
    const openAddForm = (event) => {
        setAddDiagnosis(true);
    }

    const addDiagnosisHandler = (diagnosis) => {
        props.setDiagnosisList((prevState) => {
            return [...prevState, diagnosis];
        })
        console.log(diagnosis);
    }


    return (
        <Container >

            <Card className={classes.conditionsCard}>
                <ConditionsHeader />

                {addDiagnosis && <DiagnosisForm setAddDiagnosis={setAddDiagnosis} addDiagnosisHandler={addDiagnosisHandler} />}
                <DiagnosisList addDiagnosis={addDiagnosis} diagnosisList={props.diagnosisList} />
                
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