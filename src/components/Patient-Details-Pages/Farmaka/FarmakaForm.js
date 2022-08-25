import { Row, Col } from "react-bootstrap";
import { useState, useRef } from "react";
// import FileUploader from "./FileUploader";
import SmallSaveButton from "../../UI/SmallSaveButton";
import SmallDeleteButton from "../../UI/SmallDeleteButton"
import classes from './FarmakaForm.module.css';
import FarmakoFinder from "./FarmakoFinder";
import { v4 as uuid } from 'uuid';


const FarmakaForm = (props) => {
    const [selectedFarmako, setSelectedFarmako] = useState({name:'',ATC_name:''});


    const nameInputRef = useRef();
    const typeInputRef = useRef();
    const dateOfDiagnosisInputRef = useRef();
    const dateOfVisitInputRef = useRef();

    const submitHandler = (event) => {
        console.log('submit farmakoform')
        let farmako = {
            name: selectedFarmako.name,
            ATC_name: selectedFarmako.ATC_name ,
            dateOfStart: dateOfDiagnosisInputRef.current.value,
            dateOfEnd: dateOfVisitInputRef.current.value,
            id: uuid()
        }
        console.log(farmako)
        props.addFarmakaHandler(farmako);
        props.setAddFarmako(false);
        // console.log(nameInputRef.current.value);
    }

    return (

        <Row className={classes.farmakoForm}>
            <Col sm={8} md={6} className='text-center'>
                <FarmakoFinder setSelectedFarmako={setSelectedFarmako} />
                {/* <FileUploader addFileHandler={props.addFileHandler} setSelectedFile={setSelectedFile} /> */}
                {/* <input type='file' name='title' ref={nameInputRef} /> */}
            </Col>
           

            <Col className='text-center' sm={4} md={2}><input type='date' ref={dateOfDiagnosisInputRef} /></Col>
            <Col className='text-center' sm={4} md={2}><input type='date' ref={dateOfVisitInputRef}  /></Col>
            <Col className='text-center' sm={2}>
                {!!selectedFarmako && <SmallSaveButton onClick={submitHandler} />}
                <SmallDeleteButton onClick={() => { props.setAddFarmako(false) }} />
            </Col>
        </Row>

    );
}

export default FarmakaForm;