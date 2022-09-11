import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from "../../../UI/SmallDeleteButton"
import moment from 'moment'
import classes from './DiagnosisForm.module.css';
import ConditionsFinder from "../../History/Atomiko/ConditionsFinder";
import { AuthContext } from "../../../../context/auth-context";
import { useHttpClient } from "../../../../hooks/http-hook";



const DiagnosisForm = (props) => {
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient()
    const [selectedCondition, setSelectedCondition] = useState({ code: '', condition: '' })
    const stateInputRef = useRef();

    const dateOfDiagnosisInputRef = useRef();
    const dateOfHealingInputRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault()
        const responseData = await sendRequest(`http://localhost:5000/patients/630ce238394ce3043ab038c8/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });

        let diagnosis = {
            name: selectedCondition.code + ':' + selectedCondition.condition,
            status: stateInputRef.current.value,
            dateOfDiagnosis: dateOfDiagnosisInputRef.current.value,
            dateOfHealing: dateOfHealingInputRef.current.value,
            _id: responseData
        }
        console.log('add')
        props.addDiagnosisHandler(diagnosis);
        props.setAddDiagnosis(false);
    }

    return (
        <form onSubmit={submitHandler}>
            <Row className={classes.conditionsForm}>
                <Col sm={4}>
                    <ConditionsFinder setSelectedCondition={setSelectedCondition} />
                </Col>
                <Col sm={2} className='text-center'>
                    <select ref={stateInputRef}>
                        <option value='Ύφεση'>Ύφεση</option>
                        <option value='Υποτροπή'>Υποτροπή</option>
                        <option value='Χρόνια'>Χρόνια</option>
                    </select>
                </Col>

                <Col sm={2}><input type='date' ref={dateOfDiagnosisInputRef} defaultValue={moment(new Date()).format('YYYY-MM-DD')} /></Col>
                <Col sm={2}><input type='date' ref={dateOfHealingInputRef} /></Col>
                <Col className='text-start' sm={2}>
                    {!!selectedCondition && <SmallSaveButton />}
                    <SmallDeleteButton onClick={() => { props.setAddDiagnosis(false) }} />
                </Col>
            </Row>
        </form>
    );
}

export default DiagnosisForm;