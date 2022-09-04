import { Row, Col } from "react-bootstrap";
import { useRef } from "react";
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from '../../../UI/SmallDeleteButton'
import moment from "moment";
import classes from './ConditionsForm.module.css';
// import { useHttpClient } from "../../../../hooks/http-hook";
// import { AuthContext } from "../../../../../context/auth-context";
// import { PatientContext } from "../../../../../context/patient-context";



const ConditionsEditForm = (props) => {

    console.log(props)
    // const auth=useContext(AuthContext);
    // const patientContext=useContext(PatientContext)
    // const { sendRequest } = useHttpClient();
    const stateInputRef = useRef();
    const dateOfDiagnosisInputRef = useRef();
    const dateOfHealingInputRef = useRef();


    const submitHandler = async (event) => {
        // const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });


        let condition = {
            name: props.condition,
            status: stateInputRef.current.value,
            dateOfDiagnosis: dateOfDiagnosisInputRef.current.value,
            dateOfHealing: dateOfHealingInputRef.current.value,
            _id: props.id
        }

        console.log(condition)
        props.editConditionHandler(condition, props.id);
        props.setEditForm(false);
    }

    return (

        <Row className={(!!props.editConditionHandler) ? classes.conditionsEditForm : classes.conditionsForm}>
            <Col sm={4}>
                {props.condition}
            </Col>
            <Col sm={2} className='text-center'>
                <select ref={stateInputRef}>
                    <option selected={props.status === 'Ύφεση'}>Ύφεση</option>
                    <option selected={props.status === 'Υποτροπή'}>Υποτροπή</option>
                    <option selected={props.status === 'Χρόνια'}>Χρόνια</option>
                </select>
            </Col>

            <Col sm={2}><input type='date' ref={dateOfDiagnosisInputRef} defaultValue={(!!props.dateOfDiagnosis)&&moment(props.dateOfDiagnosis).format('YYYY-MM-DD')} /></Col>
            <Col sm={2}><input type='date' ref={dateOfHealingInputRef} defaultValue={(!!props.dateOfHealing)&&moment(props.dateOfHealing).format('YYYY-MM-DD')}/></Col>
            <Col className='text-end' sm={1}>
                <SmallSaveButton onClick={submitHandler} />
            </Col>
            <Col className='text-start' sm={1}>
                <SmallDeleteButton onClick={() => { props.setEditForm(false) }} />
            </Col>

        </Row>

    );
}

export default ConditionsEditForm;