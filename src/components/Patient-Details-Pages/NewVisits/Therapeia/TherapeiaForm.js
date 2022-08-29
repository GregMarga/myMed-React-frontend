import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef, Fragment } from "react";
import FarmakoFinder from "../../Farmaka/FarmakoFinder";
import classes from './TherapeiaForm.module.css';
import { v4 as uuid } from 'uuid';



const TherapeiaForm = (props) => {
    console.log(props.diagnosisList)
    
    const [selectedFarmako, setSelectedFarmako] = useState({ name: '', ATC_name: '' });


    const conditionInputRef=useRef();
    const posotitaInputRef=useRef();
    const syxnotitaInputRef=useRef();

    const submitHandler = (event) => {
        
        let therapeia = {
            condition:conditionInputRef.current.value,
            name: selectedFarmako.name,
            ATC_name:selectedFarmako.ATC_name,
            posotita:posotitaInputRef.current.value,
            syxnotita:syxnotitaInputRef.current.value,
            id: uuid()
        }
        console.log(therapeia)
        props.addTherapeiaHandler(therapeia);
        props.setAddTherapeia(false);
    }

    return (
        <Fragment >
            <Row >
                <Col md={6} className='text-xxl-start'>
                    <label className={classes.myLabels}>Πάθηση</label>
                    <input className={classes.conditionInput} list='conditionsNames' name='conditionName' ref={conditionInputRef}/>
                    <datalist id='conditionsNames'>
                        {props.diagnosisList.map((diagnosis) => {
                            return <option value={diagnosis.name} key={uuid()} />
                        })}
                    </datalist>
                </Col>
            </Row>
            <Row>
                <Col className='text-center'>
                    <FarmakoFinder therapeia setSelectedFarmako={setSelectedFarmako} />
                </Col>
            </Row>
            <Row className={classes.dosologia}>
                <Col xl={4}>
                    <label>Ποσότητα</label>
                    <input ref={posotitaInputRef}/>
                    <datalist></datalist>
                </Col>
                <Col xl={4}>
                    <label>Συχνότητα</label>
                    <input ref={syxnotitaInputRef}/>
                    <datalist></datalist>
                </Col>


            </Row>
            <Row>
                <Col xs={4} md={2} className={`text-center ${classes.therapeiaButton}`}>
                    <button type='button' onClick={submitHandler}>Αποθήκευση</button>
                </Col>
                <Col xs={4} md={2} className={`text-center ${classes.therapeiaButton}`}>
                    <button type='button' onClick={() => {props.setAddTherapeia(false) }}>Ακύρωση</button>
                </Col>
            </Row>
        </Fragment>
    );
}

export default TherapeiaForm;