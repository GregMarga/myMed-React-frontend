import { Row, Col } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
// import FileUploader from "./FileUploader";
import SmallSaveButton from "../../UI/SmallSaveButton";
import SmallDeleteButton from "../../UI/SmallDeleteButton"
import classes from './FarmakaForm.module.css';
import FarmakoFinder from "./FarmakoFinder";
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../context/auth-context";
import { PatientContext } from "../../../context/patient-context";
import { v4 as uuid } from 'uuid';


const FarmakaForm = (props) => {
    const [selectedFarmako, setSelectedFarmako] = useState({ name: '', ATC_name: '' });

    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);

    const { sendRequest, error, clearError } = useHttpClient();


    const nameInputRef = useRef();
    const typeInputRef = useRef();
    const dateOfDiagnosisInputRef = useRef();
    const dateOfVisitInputRef = useRef();

    const submitHandler = async (event) => {
        // console.log('submit farmakoform')
        // let farmako = {
        //     name: selectedFarmako.name,
        //     ATC_name: selectedFarmako.ATC_name,
        //     dateOfStart: dateOfDiagnosisInputRef.current.value,
        //     dateOfEnd: dateOfVisitInputRef.current.value,
        //     id: uuid()
        // }
        // console.log(farmako)
        // props.addFarmakaHandler(farmako);
        // props.setAddFarmako(false);
        // // console.log(nameInputRef.current.value);
        // console.log(selectedFile);
        let farmakoId;

        try {

            const responseData = await sendRequest(`http://localhost:5000/patients/6309fcafa1c72310739694de/farmaka`, 'POST',
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
            console.log(responseData);

        } catch (err) { console.log(err) }
        let farmako = {
            name: selectedFarmako.name,
            ATC_name: selectedFarmako.ATC_name,
            dateOfStart: dateOfDiagnosisInputRef.current.value,
            dateOfEnd: dateOfVisitInputRef.current.value,
            id: farmakoId
        }

        props.addFarmakaHandler(farmako);
        props.setAddFarmako(false);

    }

    return (

        <Row className={classes.farmakoForm}>
            <Col sm={8} md={6} className='text-center'>
                <FarmakoFinder setSelectedFarmako={setSelectedFarmako} />
                {/* <FileUploader addFileHandler={props.addFileHandler} setSelectedFile={setSelectedFile} /> */}
                {/* <input type='file' name='title' ref={nameInputRef} /> */}
            </Col>


            <Col className='text-center' sm={4} md={2}><input type='date' ref={dateOfDiagnosisInputRef} /></Col>
            <Col className='text-center' sm={4} md={2}><input type='date' ref={dateOfVisitInputRef} /></Col>
            <Col className='text-center' sm={2}>
                {!!selectedFarmako && <SmallSaveButton onClick={submitHandler} />}
                <SmallDeleteButton onClick={() => { props.setAddFarmako(false) }} />
            </Col>
        </Row>

    );
}

export default FarmakaForm;