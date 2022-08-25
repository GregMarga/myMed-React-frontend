import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef, Fragment } from "react";
import FarmakoFinder from "../../Farmaka/FarmakoFinder";
import classes from './TherapeiaForm.module.css';
import { v4 as uuid } from 'uuid';



const TherapeiaForm = (props) => {
    console.log(props.diagnosisList)
    const [showHits, setShowHits] = useState(true);
    const [selectedCondition, setSelectedCondition] = useState({ code: '', condition: '' })
    const [selectedFarmako, setSelectedFarmako] = useState({name:'',ATC_name:''});


    console.log(selectedCondition)

    const submitHandler = (event) => {
        console.log('submit conditionform')
        let condition = {
            name: selectedCondition.code + ':' + selectedCondition.condition,
            id: uuid()
        }
        console.log(condition)
        props.addTherapeiaHandler(condition);
        props.setAddCondition(false);
    }

    return (
        <Fragment >
            <Row >
                <Col md={6} className='text-xxl-start'>
                    <label className={classes.myLabels}>Πάθηση</label>
                    <input className={classes.conditionInput} list='conditionsNames' name='conditionName'/>
                    <datalist id='conditionsNames'>
                        {props.diagnosisList.map((diagnosis)=>{
                           return <option value={diagnosis.name} key={uuid()}/>
                        })}
                    </datalist>
                </Col>
            </Row>
            <Row>
                <Col className='text-center'>
                    <FarmakoFinder therapeia setSelectedFarmako={setSelectedFarmako}/>
                </Col>
            </Row>
            <Row className={classes.dosologia}>
                <Col xl={4}>
                    <label>Ποσότητα</label>
                    <input />
                    <datalist></datalist>
                </Col>
                <Col xl={4}>
                    <label>Συχνότητα</label>
                    <input />
                    <datalist></datalist>
                </Col>

            </Row>
        </Fragment>
    );
}

export default TherapeiaForm;