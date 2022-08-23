import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from "../../../UI/SmallDeleteButton"
import classes from './SurgeriesForm.module.css';


const SurgeriesForm = (props) => {

    const nameInputRef = useRef();
    const typeInputRef = useRef();
    const dateOfEntranceInputRef = useRef();
    const dateOfExitInputRef = useRef();
    const hospitalInputRef = useRef();

    const submitHandler = (event) => {
        console.log(nameInputRef.current.value);
    }

    return (

        <Row className={classes.conditionsForm}>
            <Col sm={4} md={2}>
                <input type='text' name='title' />
            </Col>
            <Col className='text-center'>
                {/* <label>Κατάσταση</label> */}
                <select ref={nameInputRef}>
                    <option>Σταθερή</option>
                    <option>Υποτροπίαση</option>
                    <option>Χρόνια</option>
                </select>
            </Col>

            <Col ><input type='date' ref={dateOfEntranceInputRef} /></Col>
            <Col ><input type='date' ref={dateOfExitInputRef} /></Col>
            <Col className='text-center' sm={4} md={2}>
                <input type='text' name='hospital' ref={hospitalInputRef} />
            </Col>
            <Col className='text-start' >
                <SmallSaveButton onClick={submitHandler} />
                <SmallDeleteButton onClick={() => { }} />
            </Col>
        </Row>

    );
}

export default SurgeriesForm;