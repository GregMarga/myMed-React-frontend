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
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext)
    const [selectedCondition, setSelectedCondition] = useState({ code: '', condition: '' })
    const { sendRequest } = useHttpClient();
    const stateInputRef = useRef();
    const dateOfDiagnosisInputRef = useRef();
    const dateOfHealingInputRef = useRef();



    const submitHandler = async (event) => {
        event.preventDefault();
        const id = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });


        let condition = {
            name: selectedCondition,
            status: (stateInputRef.current.value !== 'none') ? stateInputRef.current.value : null,
            dateOfDiagnosis: dateOfDiagnosisInputRef.current.value,
            dateOfHealing: dateOfHealingInputRef.current.value,
            _id: id
        }
        console.log(selectedCondition)
        props.addConditionHandler(condition);
        props.setAddCondition(false);


    }

    return (
        <form onSubmit={submitHandler}>
            <Row className={classes.conditionsForm}>
                <Col sm={4}>
                    <ConditionsFinder setSelectedCondition={setSelectedCondition} />
                </Col>
                <Col sm={2} className='text-center'>
                    <select ref={stateInputRef}>
                        <option value="none" selected disabled hidden>Επιλέξτε</option>
                        <option value='Ύφεση'>Ύφεση</option>
                        <option value='Υποτροπή'>Υποτροπή</option>
                        <option value='Χρόνια'>Χρόνια</option>
                    </select>
                </Col>

                <Col sm={2}><input type='date' ref={dateOfDiagnosisInputRef} /></Col>
                <Col sm={2}><input type='date' ref={dateOfHealingInputRef} /></Col>
                <Col className='text-end' sm={1}>
                    {!!selectedCondition && <SmallSaveButton />}
                </Col>
                <Col className='text-start' sm={1}>
                    <SmallDeleteButton onClick={() => { props.setAddCondition(false) }} />
                </Col>
            </Row>
        </form>
    );
}

export default ConditionsForm;