import { Row, Col } from "react-bootstrap";
import { useRef } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from "../../../UI/SmallDeleteButton"
import classes from './PregnacyForm.module.css';
import { v4 as uuid } from 'uuid';


const PregnacyForm = (props) => {

    const dateInputRef = useRef();
    const gennisiInputRef = useRef();
    const babyWeightInputRef = useRef();
    const commentsInputRef = useRef();

    const submitHandler = (event) => {
        
        let pregnacy = {
            date: dateInputRef.current.value,
            gennisi: gennisiInputRef.current.value,
            baby_weight: babyWeightInputRef.current.value,
            comments: commentsInputRef.current.value,
            id: uuid()
        }
        props.addPregnacyHandler(pregnacy);
        props.setAddPregnacy(false)
    }

    return (

        <Row className={classes.pregnacyForm}>
            <Col className="text-center">
                <input type='date' name='title' ref={dateInputRef} />
            </Col>

            <Col className="text-center">
                <select ref={gennisiInputRef} >
                    <option value='normal'>Φυσιολογικός τοκετός</option>
                    <option value='kaisariki'>Καισαρική</option>
                </select>
                </Col>
            <Col className="text-center"><input type='number' ref={babyWeightInputRef} /></Col>
            <Col className='text-center' >
                <input type='text' name='comments' ref={commentsInputRef} />
            </Col>
            <Col className='text-start' sm={2}>
                <SmallSaveButton onClick={submitHandler} />
                <SmallDeleteButton onClick={() => { props.setAddPregnacy(false) }} />
            </Col>
        </Row>

    );
}

export default PregnacyForm;