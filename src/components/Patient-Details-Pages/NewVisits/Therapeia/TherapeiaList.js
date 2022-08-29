import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import TherapeiaListItem from "./TherapeiaListItem";


const TherapeiaList = (props) => {
    return (
        <Fragment>
            {props.therapeiaList.map((therapeia) => {
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
            {(props.therapeiaList.length === 0) && (!props.addTherapeia) && <Row>
                <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε μια θεραπεία.</Col>
            </Row>}
        </Fragment>
    );
}

export default TherapeiaList;