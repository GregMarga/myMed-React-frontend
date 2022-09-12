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
            </Row>
            <Row className="justify-condtent-md-text-start">
                <Col className="text-start" md={2}>
                    <label className={classes.therapeiaLabel}>Ποσότητα:</label>
                    <span>{props.quantity}</span>
                </Col>
                <Col className="text-start" md={3}>
                    <label className={classes.therapeiaLabel}>Συχνότητα:</label>
                    <span>{props.frequency}</span>
                </Col>
                <Col className="text-start" md={2}>
                    <label className={classes.therapeiaLabel}>Διάρκεια:</label>
                    <span>{props.duration}</span>
                </Col>
                <Col className="text-end" sm={4}>
                    <button type='button'className={classes.deleteButton} onClick={clickHandler}>Διαγραφή</button>
                </Col>

            </Row>
        </div>
    );
}

export default TherapeiaListItem;