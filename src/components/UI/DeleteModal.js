import classes from './DeleteModal.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const DeleteModal = (props) => {
    const [activatedButton, setActivatedButton] = useState(false)
    const [amkaValue, setAmkaValue] = useState('')

    const changeHandler = (event) => {
        setAmkaValue(event.target.value);
        if (event.target.value === props.amka) {
            setActivatedButton(true)
        } else {
            setActivatedButton(false)
        }
    }

    return (
        <Container className={classes.deleteModal}>
            <Row>
                <header>
                    <h3> Διαγραφή Ασθενή</h3>
                </header>
            </Row>
            <Row className={classes.descriptionRow}>
                <Col><span>{props.description}</span></Col>
            </Row>
            <Row className={classes.inputRow}>
                <Col className='text-center'>
                    <input placeholder='Εισάγετε το ΑΜΚΑ' minLength={11} maxLength={11} value={amkaValue} onChange={changeHandler} />
                </Col>
            </Row>
            <Row className={`${classes.buttonRow} justify-content-sm-end`}>
                <Col sm={3}><button className={classes.cancel} onClick={props.onCancel}>Ακύρωση</button></Col>
                <Col sm={3}><button disabled={!activatedButton} className={(!activatedButton) ? classes.disabled : classes.delete} onClick={props.onConfirm}>Διαγραφή</button></Col>
            </Row>
        </Container>
        // <div className={classes.deleteModal}>
        //     <header>
        //         <h3> Διαγραφή Ασθενή</h3>
        //     </header>
        //     <div>{props.description}</div>
        //     <span className={classes.myButtons}>
        //         <button className={classes.cancel} onClick={props.onCancel}>Ακύρωση</button>
        //         <button className={classes.delete} onClick={props.onConfirm}>Διαγραφή</button>
        //     </span>


        // </div>
    );
}

export default DeleteModal;