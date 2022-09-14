import classes from './DeleteModal.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import Backdrop from './Backdrop';
import { Fragment, useState } from 'react';

const DeleteConditionsModal = (props) => {
    const [activatedButton, setActivatedButton] = useState(false)
    const [userValue, setUserValue] = useState('')
    const [correctValue,setCorrectValue]=useState(Math.floor(Math.random() * (9 - 1 + 1)) + 1)


    // const correctValue = Math.floor(Math.random() * (9 - 1 + 1)) + 1;

    const changeHandler = (event) => {
        setUserValue(event.target.value);
        if (Number(event.target.value) === correctValue) {
            setActivatedButton(true)
        } else {
            setActivatedButton(false)
        }
    }

    return (
        <Fragment>
            <Backdrop onClick={props.onCancel} />
            <Container className={classes.deleteModal}>

                <Row>
                    <header>
                        <h3> {props.title}</h3>
                    </header>
                </Row>
                <Row className={classes.descriptionRow}>
                    <Col><span>{props.description + ' ' + correctValue}</span></Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col className='text-center'>
                        <input placeholder={`Γράψτε ${correctValue}`} minLength={11} maxLength={11} value={userValue} onChange={changeHandler} />
                    </Col>
                </Row>
                <Row className={`${classes.buttonRow} justify-content-sm-end`}>
                    <Col sm={3}><button className={classes.cancel} onClick={props.onCancel}>Ακύρωση</button></Col>
                    <Col sm={3}><button disabled={!activatedButton} className={(!activatedButton) ? classes.disabled : classes.delete} onClick={props.onConfirm}>Διαγραφή</button></Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default DeleteConditionsModal;