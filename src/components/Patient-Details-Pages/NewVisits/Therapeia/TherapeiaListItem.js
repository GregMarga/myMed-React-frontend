import { Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";
import classes from './TherapeiaListItem.module.css'
import TherapeiaEditForm from "./TherapeiaEditForm";

const TherapeiaListItem = (props) => {
    const [editTherapeia, setEditTherapeia] = useState(false)


    const clickHandler = (event) => {
        props.removeTherapeiaHandler(props.id)
    }
    const editHandler = (event) => {
        setEditTherapeia(true)
    }


    return (
        <Fragment>
            {editTherapeia && <TherapeiaEditForm
                condition={props.condition}
                drugName={props.drugName}
                ATC_name={props.ATC_name}
                posotita={props.quantity}
                syxnotita={props.frequency}
                duration={props.duration}
                id={props.id}
                setEditTherapeia={setEditTherapeia}
                editTherapeiaHandler={props.editTherapeiaHandler}
            />}
            {!editTherapeia && <div className={classes.therapeiaListItem}>
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
                    <Col className="text-md-end" sm={4} md={2}>
                        <button type='button' className={classes.editButton} onClick={editHandler}>Επεξεργασία</button>
                    </Col>
                    <Col className="text-md-end" sm={4} md={2}>
                        <button type='button' className={classes.deleteButton} onClick={clickHandler}>Διαγραφή</button>
                    </Col>

                </Row>
            </div>}
        </Fragment>
    );
}

export default TherapeiaListItem;