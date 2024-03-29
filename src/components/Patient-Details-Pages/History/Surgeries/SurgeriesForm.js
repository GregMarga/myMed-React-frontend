import { Row, Col } from "react-bootstrap";
import { useRef } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from "../../../UI/SmallDeleteButton"
import classes from './SurgeriesForm.module.css';



const SurgeriesForm = (props) => {

    const nameInputRef = useRef();
    const dateOfEntranceInputRef = useRef();
    const dateOfExitInputRef = useRef();
    const hospitalInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault()
        let surgery = {
            title: nameInputRef.current.value,
            dateOfEntrance: dateOfEntranceInputRef.current.value,
            dateOfExit: dateOfExitInputRef.current.value,
            hospital: hospitalInputRef.current.value,

        }
        props.addSurgeryHandler(surgery);
        props.setAddSurgery(false)
    }

    return (
        <form onSubmit={submitHandler}>
            <Row className={classes.surgeriesForm}>
                <Col className="text-center">
                    <input type='text' name='title' ref={nameInputRef} required/>
                </Col>

                <Col className="text-center"><input type='date' ref={dateOfEntranceInputRef} /></Col>
                <Col className="text-center"><input type='date' ref={dateOfExitInputRef} /></Col>
                <Col className='text-center' md={2}>
                    <input type='text' name='hospital' ref={hospitalInputRef} />
                </Col>
                <Col className='text-end' sm={1}>
                    <SmallSaveButton />
                </Col>
                <Col className='text-start' sm={1}>
                    <SmallDeleteButton onClick={() => { props.setAddSurgery(false) }} />
                </Col>
            </Row>
        </form>

    );
}

export default SurgeriesForm;