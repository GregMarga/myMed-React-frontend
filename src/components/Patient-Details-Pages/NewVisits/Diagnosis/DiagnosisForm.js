import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from "../../../UI/SmallDeleteButton"
import moment from 'moment'
import classes from './DiagnosisForm.module.css';
import ConditionsFinder from "../../History/Atomiko/ConditionsFinder";
import { v4 as uuid } from 'uuid';



const DiagnosisForm = (props) => {
    const [showHits, setShowHits] = useState(true);
    const [selectedCondition, setSelectedCondition] = useState({code:'',condition:''})
    const stateInputRef = useRef();
    const severityInputRef = useRef();
    const dateOfDiagnosisInputRef = useRef();
    const dateOfHealingInputRef = useRef();

    console.log(selectedCondition)

    const submitHandler = (event) => {
        console.log('submit conditionform')
        let diagnosis = {
            name: selectedCondition.code + ':' + selectedCondition.condition,
            state:stateInputRef.current.value,
            dateOfDiagnosis: dateOfDiagnosisInputRef.current.value,
            dateOfHealing: dateOfHealingInputRef.current.value,
            id: uuid()
        }
        console.log(diagnosis)
        props.addDiagnosisHandler(diagnosis);
        props.setAddDiagnosis(false);
    }

    return (

        <Row className={classes.conditionsForm}>
            <Col sm={4}>
                <ConditionsFinder setSelectedCondition={setSelectedCondition}/>
            </Col>
            <Col sm={2} className='text-center'>
                <select ref={stateInputRef}>
                    <option>Ύφεση</option>
                    <option>Υποτροπή</option>
                    <option>Χρόνια</option>
                </select>
            </Col>

            <Col sm={2}><input type='date' ref={dateOfDiagnosisInputRef} defaultValue={moment(new Date()).format('YYYY-MM-DD')}/></Col>
            <Col sm={2}><input type='date' ref={dateOfHealingInputRef} /></Col>
            <Col className='text-start' sm={2}>
                {!!selectedCondition && <SmallSaveButton onClick={submitHandler} />}
                <SmallDeleteButton onClick={() => { props.setAddDiagnosis(false) }} />
            </Col>
        </Row>

    );
}

export default DiagnosisForm;