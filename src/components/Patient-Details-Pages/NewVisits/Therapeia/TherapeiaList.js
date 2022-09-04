import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TherapeiaListItem from "./TherapeiaListItem";
import classes from './TherapeiaList.module.css'

const TherapeiaList = (props) => {
   
  
    const visitId=useParams().visitId
    const patientId=useParams().patientId;

    const loadHandler = async (event) => {

        props.dispatch({ type: 'oldTherapeia', payload: { oldTherapeia: true } })
    }
    console.log(props.oldTherapeia,visitId !== 'new',props.touchForm,props.loadedTherapeiaList.length===0,props.therapeiaList.length !== 0)
    console.log((((props.oldTherapeia) || (visitId !== 'new')) || (((props.touchForm)||(props.loadedTherapeiaList.length === 0))&&(props.therapeiaList.length !== 0))))


    return (
        <Fragment>
            {(((props.oldTherapeia) || (visitId !== 'new')) || (((props.touchForm)||(props.loadedTherapeiaList.length === 0))&&(props.therapeiaList.length !== 0)))&&props.therapeiaList.map((therapeia) => {
                return <TherapeiaListItem
                    condition={therapeia.condition}
                    drugName={therapeia.name}
                    ATC_name={therapeia.ATC_name}
                    quantity={therapeia.posotita}
                    frequency={therapeia.syxnotita}
                    key={therapeia._id}
                    id={therapeia._id}
                    removeTherapeiaHandler={props.removeTherapeiaHandler}
                />
            })}
            
            {(props.loadedTherapeiaList.length !== 0) && (!props.addTherapeia)&& (!props.oldTherapeia)&&(props.therapeiaList.length === 0) && (visitId === 'new') && <Row>
                <Col className={`text-center ${classes.loadRow}`}>
                    Για να φορτώσετε τις  θεραπείες της τελευταίας επίσκεψης πατήστε το κουμπί <button type='button' onClick={loadHandler}>Φόρτωση</button>
                </Col>
            </Row>}
            {(((props.therapeiaList.length === 0) && (!props.addTherapeia) && (props.oldTherapeia)) || ((props.loadedTherapeiaList.length === 0) &&(!props.touchForm)&& (!props.addTherapeia))) && <Row>
                <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε μια θεραπεία.</Col>
            </Row>}
        </Fragment>
    );
}

export default TherapeiaList;