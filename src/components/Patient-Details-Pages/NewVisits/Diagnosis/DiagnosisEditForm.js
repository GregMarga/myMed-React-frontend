import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from "../../../UI/SmallDeleteButton"
import moment from 'moment'
import classes from './DiagnosisForm.module.css';
// import { AuthContext } from "../../../../context/auth-context";
// import { useHttpClient } from "../../../../hooks/http-hook";



const DiagnosisEditForm = (props) => {

    const [selectedCondition, setSelectedCondition] = useState({ code: '', condition: '' })
    const stateInputRef = useRef();

    const dateOfDiagnosisInputRef = useRef();
    const dateOfHealingInputRef = useRef();

    const submitHandler = async (event) => {
        // const responseData = await sendRequest(`http://localhost:5000/patients/630ce238394ce3043ab038c8/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
        event.preventDefault();
        let diagnosis = {
            name: props.condition,
            status: stateInputRef.current.value,
            dateOfDiagnosis: dateOfDiagnosisInputRef.current.value,
            dateOfHealing: dateOfHealingInputRef.current.value,
            _id: props.id

        }

        props.editDiagnosisHanlder(diagnosis, props.id);
        props.setEditForm(false);
    }

    return (
        <form onSubmit={submitHandler}>
            <Row className={classes.conditionsForm}>
                <Col sm={4} className='text-center'>
                    {props.condition}
                </Col>
                <Col sm={2} className='text-center'>
                    <select ref={stateInputRef}>
                        <option value='Ύφεση' selected={props.status === 'Ύφεση'}>Ύφεση</option>
                        <option value='Υποτροπή' selected={props.status === 'Υποτροπή'}>Υποτροπή</option>
                        <option value='Χρόνια' selected={props.status === 'Χρόνια'}>Χρόνια</option>
                    </select>
                </Col>

                <Col sm={2} className='text-center'><input type='date' ref={dateOfDiagnosisInputRef} defaultValue={(!!props.dateOfDiagnosis) && moment(props.dateOfDiagnosis).format('YYYY-MM-DD')} /></Col>
                <Col sm={2} className='text-center'><input type='date' ref={dateOfHealingInputRef} defaultValue={(!!props.dateOfHealing) && moment(props.dateOfHealing).format('YYYY-MM-DD')} /></Col>
                <Col className='text-end' sm={1}>
                    <SmallSaveButton />
                </Col>
                <Col sm={1} className='text_-start'>
                    <SmallDeleteButton onClick={() => { props.setEditForm(false) }} />
                </Col>
            </Row>
        </form>

    );
}

export default DiagnosisEditForm;