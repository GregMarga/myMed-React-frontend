import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from "../../../UI/SmallDeleteButton"

import classes from './ConditionsForm.module.css';
import ConditionsFinder from "./ConditionsFinder";
import { useHttpClient } from "../../../../hooks/http-hook";
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";



const ConditionsForm = (props) => {
    const auth=useContext(AuthContext);
    const patientContext=useContext(PatientContext)
    const [selectedCondition, setSelectedCondition] = useState({ code: '', condition: '' })
    const {sendRequest}=useHttpClient();
    const stateInputRef = useRef();
    const severityInputRef = useRef();
    const dateOfDiagnosisInputRef = useRef();
    const dateOfHealingInputRef = useRef();

    console.log(selectedCondition)

    const submitHandler = async (event) => {
        const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
       
        
        let condition = {
            name: selectedCondition.code + ': ' + selectedCondition.condition,
            state: stateInputRef.current.value,
            dateOfDiagnosis: dateOfDiagnosisInputRef.current.value,
            dateOfHealing: dateOfHealingInputRef.current.value,
            _id: responseData
        }
       
        props.addConditionHandler(condition);
        props.setAddCondition(false);
    }

    return (

        <Row className={classes.conditionsForm}>
            <Col sm={4}>
                <ConditionsFinder setSelectedCondition={setSelectedCondition} />
            </Col>
            <Col sm={2} className='text-center'>
                <select ref={stateInputRef}>
                    <option>Ύφεση</option>
                    <option>Υποτροπή</option>
                    <option>Χρόνια</option>
                </select>
            </Col>

            <Col sm={2}><input type='date' ref={dateOfDiagnosisInputRef} /></Col>
            <Col sm={2}><input type='date' ref={dateOfHealingInputRef} /></Col>
            <Col className='text-start' sm={2}>
                {!!selectedCondition && <SmallSaveButton onClick={submitHandler} />}
                <SmallDeleteButton onClick={() => { props.setAddCondition(false) }} />
            </Col>
        </Row>

    );
}

export default ConditionsForm;