import { Row, Col } from "react-bootstrap";
import { useState, useRef, useContext } from "react";
import SmallSaveButton from "../../UI/SmallSaveButton";
import SmallDeleteButton from "../../UI/SmallDeleteButton"
import classes from './FarmakaForm.module.css';

import moment from "moment";



const FarmakaEditForm = (props) => {
    const [selectedFarmako, setSelectedFarmako] = useState({ name: '', ATC_name: '' });


    const dateOfDiagnosisInputRef = useRef();
    const dateOfVisitInputRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            let farmako = {
                dateOfStart: dateOfDiagnosisInputRef.current.value,
                dateOfEnd: dateOfVisitInputRef.current.value,
            }
            console.log(farmako);
            props.editFarmakoHandler(farmako,props.id);
            props.setEditFarmako(false);

        } catch (err) { console.log(err) }


    }

    return (
        <form onSubmit={submitHandler}>
            <Row className={classes.farmakoForm}>
                <Col sm={8} md={3} className='text-center'>
                    {props.farmakoName}
                </Col>
                <Col sm={8} md={3} className='text-center'>
                    {props.farmakoType}
                </Col>

                <Col className='text-center' sm={4} md={2}><input type='date' defaultValue={(!!props.dateOfStart) ? moment(props.dateOfStart).format('YYYY-MM-DD') : null} ref={dateOfDiagnosisInputRef} /></Col>
                <Col className='text-center' sm={4} md={2}><input type='date' defaultValue={(!!props.dateOfEnd) ? moment(props.dateOfEnd).format('YYYY-MM-DD') : null} ref={dateOfVisitInputRef} /></Col>
                <Col className='text-center' sm={2}>
                    {!!selectedFarmako && <SmallSaveButton />}
                    <SmallDeleteButton onClick={() => { props.setEditFarmako(false) }} />
                </Col>
            </Row>
        </form>
    );
}

export default FarmakaEditForm;