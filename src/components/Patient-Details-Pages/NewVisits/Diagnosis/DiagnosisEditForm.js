import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from "../../../UI/SmallDeleteButton"
import moment from 'moment'
import classes from './DiagnosisForm.module.css';
// import { AuthContext } from "../../../../context/auth-context";
// import { useHttpClient } from "../../../../hooks/http-hook";



const DiagnosisEditForm = (props) => {
    console.log(props)
    console.log(props.dateOfHealing)
    console.log(moment(props.dateOfHealing).format('YYYY-MM-DD'))
    const [selectedCondition, setSelectedCondition] = useState({ code: '', condition: '' })
    const stateInputRef = useRef();

    const dateOfDiagnosisInputRef = useRef();
    const dateOfHealingInputRef = useRef();

    const submitHandler = async (event) => {
        // const responseData = await sendRequest(`http://localhost:5000/patients/630ce238394ce3043ab038c8/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });

        let diagnosis = {
            name: props.condition,
            state: stateInputRef.current.value,
            dateOfDiagnosis: dateOfDiagnosisInputRef.current.value,
            dateOfHealing: dateOfHealingInputRef.current.value,
            _id: props.id

        }
        console.log(diagnosis)
        props.editDiagnosisHanlder(diagnosis,props.id);
        props.setEditForm(false);
    }

    return (

        <Row className={classes.conditionsForm}>
            <Col sm={4}>
                {props.condition}
            </Col>
            <Col sm={2} className='text-center'>
                <select ref={stateInputRef}>
                    <option value='Ύφεση' selected={props.state === 'Ύφεση'}>Ύφεση</option>
                    <option value='Υποτροπή' selected={props.state === 'Υποτροπή'}>Υποτροπή</option>
                    <option value='Χρόνια' selected={props.state === 'Χρόνια'}>Χρόνια</option>
                </select>
            </Col>

            <Col sm={2} className='text-center'><input type='date' ref={dateOfDiagnosisInputRef} defaultValue={(!!props.dateOfDiagnosis)&&moment(props.dateOfDiagnosis).format('YYYY-MM-DD')} /></Col>
            <Col sm={2} className='text-center'><input type='date' ref={dateOfHealingInputRef} defaultValue={(!!props.dateOfHealing)&&moment(props.dateOfHealing).format('YYYY-MM-DD')}/></Col>
            <Col className='text-end' sm={1}>
                {!!selectedCondition && <SmallSaveButton onClick={submitHandler} />}
                </Col>
                <Col sm={1} className='text_-start'>
                <SmallDeleteButton onClick={() => { props.setEditForm(false) }} />
            </Col>
        </Row>

    );
}

export default DiagnosisEditForm;