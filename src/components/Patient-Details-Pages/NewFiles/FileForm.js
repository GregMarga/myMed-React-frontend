import { Row, Col } from "react-bootstrap";
import { useState, useRef } from "react";
import FileUploader from "./FileUploader";
import SmallSaveButton from "../../UI/SmallSaveButton";
import SmallDeleteButton from "../../UI/SmallDeleteButton"
import classes from './FileForm.module.css';
import moment from 'moment';
import { useHttpClient } from "../../../hooks/http-hook";
import { v4 as uuid } from 'uuid';


const FilesForm = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { sendRequest, error } = useHttpClient();


    const nameInputRef = useRef();
    const typeInputRef = useRef();
    const dateOfDiagnosisInputRef = useRef();
    const dateOfVisitInputRef = useRef();

    const submitHandler = async (event) => {
        console.log(selectedFile);
        let fileId;

        try {
            const formData = new FormData();
            formData.append('exam', selectedFile);
            formData.append('name',selectedFile.name)
            formData.append('type', typeInputRef.current.value);
            formData.append('dateOfDiagnosis', dateOfDiagnosisInputRef.current.value);
            formData.append('dateOfVisit', dateOfVisitInputRef.current.value);

            const responseData = await sendRequest(`http://localhost:5000/patients/630ce238394ce3043ab038c8/uploads/exams`, 'POST', formData);
            fileId=responseData.exam._id
            console.log(responseData);

        } catch (err) { console.log(err) }
        let file = {
            name: selectedFile.path,
            type: typeInputRef.current.value,
            dateOfDiagnosis: dateOfDiagnosisInputRef.current.value,
            dateOfVisit: dateOfVisitInputRef.current.value,
            id: fileId
        }

        props.addFileHandler(file);
        props.setAddFile(false);



        // console.log(nameInputRef.current.value);
    }

    return (

        <Row className={classes.fileForm}>
            <Col sm={4} md={4} className='text-center'>
                <FileUploader addFileHandler={props.addFileHandler} setSelectedFile={setSelectedFile} />
                {/* <input type='file' name='title' ref={nameInputRef} /> */}
            </Col>
            <Col className='text-center' sm={4} md={2}>
                {/* <label>Κατάσταση</label> */}
                <select ref={typeInputRef}>
                    <option>Αίματος</option>
                    <option>Απεικονιστικές </option>
                    <option>Άλλη</option>
                    <option></option>
                </select>
            </Col>

            <Col className='text-center' sm={4} md={2}><input type='date' ref={dateOfDiagnosisInputRef} /></Col>
            <Col className='text-center' sm={4} md={2}><input type='date' ref={dateOfVisitInputRef} defaultValue={moment(new Date()).format('YYYY-MM-DD')} /></Col>
            <Col className='text-center' sm={2}>
                {!!selectedFile && <SmallSaveButton onClick={submitHandler} />}
                <SmallDeleteButton onClick={() => { props.setAddFile(false) }} />
            </Col>
        </Row>

    );
}

export default FilesForm;