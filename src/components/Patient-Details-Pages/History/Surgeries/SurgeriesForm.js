import { Row, Col } from "react-bootstrap";
import { useRef } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from "../../../UI/SmallDeleteButton"
import classes from './SurgeriesForm.module.css';
import { v4 as uuid } from 'uuid';


const SurgeriesForm = (props) => {

    const nameInputRef = useRef();
    const dateOfEntranceInputRef = useRef();
    const dateOfExitInputRef = useRef();
    const hospitalInputRef = useRef();

    const submitHandler = (event) => {
        console.log(nameInputRef.current.value);
        let surgery = {
            title: nameInputRef.current.value,
            dateOfEntrance: dateOfEntranceInputRef.current.value,
            dateOfExit: dateOfExitInputRef.current.value,
            hospital: hospitalInputRef.current.value,
            _id: uuid()
        }
        props.addSurgeryHandler(surgery);
        props.setAddSurgery(false)
    }

    return (

        <Row className={classes.surgeriesForm}>
            <Col className="text-center">
                <input type='text' name='title' ref={nameInputRef} />
            </Col>

            <Col className="text-center"><input type='date' ref={dateOfEntranceInputRef} /></Col>
            <Col className="text-center"><input type='date' ref={dateOfExitInputRef} /></Col>
            <Col className='text-center' sm={4} md={2}>
                <input type='text' name='hospital' ref={hospitalInputRef} />
            </Col>
            <Col className='text-start' sm={2}>
                <SmallSaveButton onClick={submitHandler} />
                <SmallDeleteButton onClick={() => { props.setAddSurgery(false) }} />
            </Col>
        </Row>

    );
}

export default SurgeriesForm;