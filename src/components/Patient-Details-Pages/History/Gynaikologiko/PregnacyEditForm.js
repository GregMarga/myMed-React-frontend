import { Row, Col } from "react-bootstrap";
import { useRef } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from "../../../UI/SmallDeleteButton"
import classes from './PregnacyForm.module.css';
import moment from "moment";

const PregnacyEditForm = (props) => {

    const dateInputRef = useRef();
    const gennisiInputRef = useRef();
    const babyWeightInputRef = useRef();
    const commentsInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        let pregnacy = {
            date_of_birth: dateInputRef.current.value,
            gennisi: gennisiInputRef.current.value,
            baby_weight: babyWeightInputRef.current.value,
            comments: commentsInputRef.current.value,

        }
        props.editPregnacyHandler(pregnacy,props.id);
        props.setEditForm(false)
    }

    return (
        <form onSubmit={submitHandler}>
            <Row className={classes.pregnacyForm}>
                <Col className="text-center">
                    <input type='date' name='title' ref={dateInputRef} defaultValue={(!!props.date) ? moment(props.date).format('YYYY-MM-DD') : null} required />
                </Col>

                <Col className="text-center">
                    <select ref={gennisiInputRef} required>
                        <option value='Φυσιολογικός τοκετός' selected={props.gennisi==='Φυσιολογικός τοκετός'}>Φυσιολογικός τοκετός</option>
                        <option value='Καισαρική' selected={props.gennisi==='Καισαρική'}>Καισαρική</option>
                    </select>
                </Col>
                <Col className="text-center"><input type='text' ref={babyWeightInputRef} defaultValue={props.babyWeight}/></Col>
                <Col className='text-center' >
                    <input type='text' name='comments' ref={commentsInputRef} defaultValue={props.comments}/>
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

export default PregnacyEditForm;