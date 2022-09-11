import { Row, Col } from "react-bootstrap";
import { useRef } from "react";
import SmallSaveButton from "../../../../UI/SmallSaveButton"
import SmallDeleteButton from "../../../../UI/SmallDeleteButton"
import classes from './OzosForm.module.css';
import moment from 'moment'



const OzosForm = (props) => {

    const nameInputRef = useRef();
    const heightInputRef = useRef();
    const depthInputRef = useRef();
    const lengthInputRef = useRef();
    const dateOfFindingInputRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();
        let ozos = {
            name: nameInputRef.current.value,
            height: heightInputRef.current.value,
            length: lengthInputRef.current.value,
            depth: depthInputRef.current.value,
            dateOfFinding: dateOfFindingInputRef.current.value,

        }
        props.addOzosHandler(ozos);
        props.setAddOzos(false);
    }



    return (
        <form onSubmit={submitHandler}>
            <Row className={classes.ozosForm}>
                <Col className='text-center' sm={4} md={2}><input ref={nameInputRef} required /></Col>
                <Col className='text-center' sm={4} md={2}><input type='number' min={1} max={100} ref={lengthInputRef} required /></Col>
                <Col className='text-center' sm={4} md={2}><input type='number' min={1} max={100} ref={heightInputRef} required /></Col>
                <Col className='text-center' sm={4} md={2}><input type='number' min={1} max={100} ref={depthInputRef} required /></Col>
                <Col className='text-center' sm={4} md={2}><input type='date' ref={dateOfFindingInputRef} defaultValue={moment(new Date()).format('YYYY-MM-DD')} /></Col>
                <Col className='text-center' sm={2}>
                    <SmallSaveButton />
                    <SmallDeleteButton onClick={() => { props.setAddOzos(false) }} />
                </Col>
            </Row>
        </form>

    );
}

export default OzosForm;