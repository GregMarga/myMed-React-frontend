import { Row, Col } from "react-bootstrap";
import { useRef } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from "../../../UI/SmallDeleteButton"
import classes from './SurgeriesForm.module.css';
import moment from 'moment'



const SurgeryEditForm = (props) => {

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
        props.editSurgeryHandler(surgery, props.id);
        props.setEditForm(false);
    }

    return (
        <form onSubmit={submitHandler}>
            <Row className={classes.surgeriesForm}>
                <Col className="text-center">
                    <input type='text' name='title' ref={nameInputRef} defaultValue={props.title} />
                </Col>

                <Col className="text-center"><input type='date' ref={dateOfEntranceInputRef} defaultValue={(!!props.dateOfEntrance) ? moment(props.dateOfEntrance).format('YYYY-MM-DD') : null} /></Col>
                <Col className="text-center"><input type='date' ref={dateOfExitInputRef} defaultValue={(!!props.dateOfExit) ? moment(props.dateOfExit).format('YYYY-MM-DD') : null} /></Col>
                <Col className='text-center' sm={4} md={2}>
                    <input type='text' name='hospital' ref={hospitalInputRef} defaultValue={props.hospital} />
                </Col>
                <Col className='text-end' sm={1}>
                    <SmallSaveButton />
                </Col>
                <Col className='text-start' sm={1}>
                    <SmallDeleteButton onClick={() => { props.setEditForm(false) }} />
                </Col>
            </Row>
        </form>

    );
}

export default SurgeryEditForm;