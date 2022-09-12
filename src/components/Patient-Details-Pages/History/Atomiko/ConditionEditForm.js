import { Row, Col } from "react-bootstrap";
import { useRef } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from '../../../UI/SmallDeleteButton'
import moment from "moment";
import classes from './ConditionsForm.module.css';




const ConditionsEditForm = (props) => {

    const stateInputRef = useRef();
    const dateOfDiagnosisInputRef = useRef();
    const dateOfHealingInputRef = useRef();


    const submitHandler = async (event) => {
        event.preventDefault();
        let condition = {
            name: props.condition,
            status: (stateInputRef.current.value !== 'none') ? stateInputRef.current.value : null,
            dateOfDiagnosis: dateOfDiagnosisInputRef.current.value,
            dateOfHealing: dateOfHealingInputRef.current.value,
            _id: props.id
        }

        props.editConditionHandler(condition, props.id);
        props.setEditForm(false);
    }

    return (
        <form onSubmit={submitHandler}>
            <Row className={(!!props.editConditionHandler) ? classes.conditionsEditForm : classes.conditionsForm}>
                <Col sm={4} className='text-center'>
                    {props.condition}
                </Col>
                <Col sm={2} className='text-center'>
                    <select ref={stateInputRef}>
                        <option value="none" selected disabled hidden>Επιλέξτε</option>
                        <option selected={props.status === 'Ύφεση'}>Ύφεση</option>
                        <option selected={props.status === 'Υποτροπή'}>Υποτροπή</option>
                        <option selected={props.status === 'Χρόνια'}>Χρόνια</option>
                    </select>
                </Col>

                <Col sm={2}><input type='date' ref={dateOfDiagnosisInputRef} defaultValue={(!!props.dateOfDiagnosis) && moment(props.dateOfDiagnosis).format('YYYY-MM-DD')} /></Col>
                <Col sm={2}><input type='date' ref={dateOfHealingInputRef} defaultValue={(!!props.dateOfHealing) && moment(props.dateOfHealing).format('YYYY-MM-DD')} /></Col>
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

export default ConditionsEditForm;