import { Row, Col } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import SmallSaveButton from "../../../../UI/SmallSaveButton"
import SmallDeleteButton from "../../../../UI/SmallDeleteButton"
import classes from './OzosForm.module.css';
import { AuthContext } from "../../../../../context/auth-context";
import { PatientContext } from "../../../../../context/patient-context";
import { useHttpClient } from "../../../../../hooks/http-hook";
import moment from 'moment'



const OzosForm = (props) => {
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { sendRequest } = useHttpClient()


    const nameInputRef = useRef();
    const heightInputRef = useRef();
    const depthInputRef = useRef();
    const lengthInputRef = useRef();
    const dateOfFindingInputRef = useRef();

    const submitHandler = async (event) => {

        const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });


        let ozos = {
            name: nameInputRef.current.value,
            height: heightInputRef.current.value,
            length: lengthInputRef.current.value,
            depth: depthInputRef.current.value,
            dateOfFinding: dateOfFindingInputRef.current.value,
            identifier: responseData,
            _id: responseData
        }

        props.addOzosHandler(ozos);
        props.setAddOzos(false);
    }





    return (

        <Row className={classes.ozosForm}>

            <Col className='text-center' sm={4} md={2}><input ref={nameInputRef} /></Col>
            <Col className='text-center' sm={4} md={2}><input type='number' min={1} max={100} ref={lengthInputRef} /></Col>
            <Col className='text-center' sm={4} md={2}><input type='number' min={1} max={100} ref={heightInputRef} /></Col>
            <Col className='text-center' sm={4} md={2}><input type='number' min={1} max={100} ref={depthInputRef} /></Col>
            <Col className='text-center' sm={4} md={2}><input type='date' ref={dateOfFindingInputRef} defaultValue={moment(new Date()).format('YYYY-MM-DD')} /></Col>
            <Col className='text-center' sm={2}>
                <SmallSaveButton onClick={submitHandler} />
                <SmallDeleteButton onClick={() => { props.setAddOzos(false) }} />
            </Col>

        </Row>

    );
}

export default OzosForm;