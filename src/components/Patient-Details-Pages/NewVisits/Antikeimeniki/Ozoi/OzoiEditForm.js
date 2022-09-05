import { Row, Col } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import SmallSaveButton from "../../../../UI/SmallSaveButton"
import SmallDeleteButton from "../../../../UI/SmallDeleteButton"
import classes from './OzosForm.module.css';
import { AuthContext } from "../../../../../context/auth-context";
import { PatientContext } from "../../../../../context/patient-context";
import { useHttpClient } from "../../../../../hooks/http-hook";
import moment from 'moment'



const OzoiEditForm = (props) => {
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { sendRequest } = useHttpClient()


    const nameInputRef = useRef();
    const heightInputRef = useRef();
    const depthInputRef = useRef();
    const lengthInputRef = useRef();
    const dateOfFindingInputRef = useRef();

    const submitHandler = async (event) => {
        let ozos = {
            name: nameInputRef.current.value,
            height: heightInputRef.current.value,
            length: lengthInputRef.current.value,
            depth: depthInputRef.current.value,
            dateOfFinding: dateOfFindingInputRef.current.value,
            identifier: props.identifier,
            _id: props.id

        }

        props.editOzosHanlder(ozos, props.id)
        props.setEditForm(false);
    }



    return (

        <Row className={classes.ozosForm}>

            <Col className='text-center' sm={4} md={2}><input disabled ref={nameInputRef} defaultValue={props.name} /></Col>
            <Col className='text-center' sm={4} md={2}><input type='number' min={1} max={100} ref={lengthInputRef} defaultValue={props.length} /></Col>
            <Col className='text-center' sm={4} md={2}><input type='number' min={1} max={100} ref={heightInputRef} defaultValue={props.height} /></Col>
            <Col className='text-center' sm={4} md={2}><input type='number' min={1} max={100} ref={depthInputRef} defaultValue={props.depth} /></Col>
            <Col className='text-center' sm={4} md={2}><input type='date' ref={dateOfFindingInputRef} defaultValue={moment(props.dateOfFinding).format('YYYY-MM-DD')} /></Col>
            <Col className='text-center' sm={2}>
                <SmallSaveButton onClick={submitHandler} />
                <SmallDeleteButton onClick={() => { props.setEditForm(false) }} />
            </Col>

        </Row>

    );
}

export default OzoiEditForm;