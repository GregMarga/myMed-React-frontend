import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import classes from './TherapeiaListItem.module.css'

const TherapeiaListItem = (props) => {

    const clickHandler=(event)=>{
        props.removeTherapeiaHandler(props.id)
    }


    return (
        <div className={classes.therapeiaListItem}>
            <Row>
                <Col className="text-start" >
                    <label className={classes.therapeiaLabel}>Πάθηση:</label>
                    <span>{props.condition}</span>
                </Col>

            </Row>
            <Row>
                <Col className="text-start">
                    <label className={classes.therapeiaLabel}>Εμπορική Ονομασία</label>
                    <span>{props.drugName}</span>
                </Col>
                <Col className="text-start">
                    <label className={classes.therapeiaLabel}>ATC Δραστική Ουσία:</label>
                    <span>{props.ATC_name}</span>
                </Col>
                <Col className="text-start" sm={2}>
                    <button type='button' onClick={clickHandler}>Διαγραφή</button>
                </Col>

            </Row>
            <Row className="justify-condtent-md-text-start">
                <Col className="text-start" md={2}>
                    <label className={classes.therapeiaLabel}>Ποσότητα:</label>
                    <span>{props.quantity}</span>
                </Col>
                <Col className="text-start" md={2}>
                    <label className={classes.therapeiaLabel}>Συχνότητα:</label>
                    <span>{props.frequency}</span>
                </Col>
            </Row>
        </div>
    );
}

export default TherapeiaListItem;