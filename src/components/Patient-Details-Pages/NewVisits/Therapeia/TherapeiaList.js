import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import TherapeiaListItem from "./TherapeiaListItem";


const TherapeiaList = (props) => {
    return (
        <Fragment>
            {props.therapeiaList.map((therapeia) => {
                return <TherapeiaListItem
                    condition={therapeia.condition}
                    drugName={therapeia.drugName}
                    ATC_name={therapeia.ATC_name}
                    quantity={therapeia.quantity}
                    frequency={therapeia.frequency}
                />
            })}
            {(props.therapeiaList.length === 0) && (!props.addTherapeia) && <Row>
                <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε μια θεραπεία.</Col>
            </Row>}
        </Fragment>
    );
}

export default TherapeiaList;