import { Row, Col } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import SmallSaveButton from "../../UI/SmallSaveButton";
import SmallDeleteButton from "../../UI/SmallDeleteButton"
import classes from './FarmakaForm.module.css';
import FarmakoFinder from "./FarmakoFinder";
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../context/auth-context";
import { PatientContext } from "../../../context/patient-context";



const FarmakaForm = (props) => {
    const [selectedFarmako, setSelectedFarmako] = useState({ name: '', ATC_name: '' });

    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);

    const { sendRequest, error, clearError } = useHttpClient();



    const dateOfDiagnosisInputRef = useRef();
    const dateOfVisitInputRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();
        let farmakoId;
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/farmaka`, 'POST',
                JSON.stringify({
                    name: selectedFarmako.name,
                    ATC_name: selectedFarmako.ATC_name,
                    dateOfStart: dateOfDiagnosisInputRef.current.value,
                    dateOfEnd: dateOfVisitInputRef.current.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                });
            farmakoId = responseData.farmako._id

            let farmako = {
                name: selectedFarmako.name,
                ATC_name: selectedFarmako.ATC_name,
                dateOfStart: dateOfDiagnosisInputRef.current.value,
                dateOfEnd: dateOfVisitInputRef.current.value,
                _id: farmakoId
            }
            console.log(farmako);
            props.addFarmakaHandler(farmako);
            props.setAddFarmako(false);

        } catch (err) { console.log(err) }


    }

    return (
        <form onSubmit={submitHandler}>
            <Row className={classes.farmakoForm}>
                <Col sm={8} md={6} className='text-center'>
                    <FarmakoFinder setSelectedFarmako={setSelectedFarmako} />
                </Col>


                <Col className='text-center' sm={4} md={2}><input type='date' ref={dateOfDiagnosisInputRef} /></Col>
                <Col className='text-center' sm={4} md={2}><input type='date' ref={dateOfVisitInputRef} /></Col>
                <Col className='text-center' sm={2}>
                    {!!selectedFarmako && <SmallSaveButton />}
                    <SmallDeleteButton onClick={() => { props.setAddFarmako(false) }} />
                </Col>
            </Row>
        </form>
    );
}

export default FarmakaForm;