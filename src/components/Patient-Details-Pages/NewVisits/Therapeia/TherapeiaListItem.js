import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";

const TherapeiaListItem = (props) => {
    return (
        <Fragment>
            <Row>
                <Col className="text-center">
                    <label>Πάθηση</label>
                    <span>{props.condition}</span>
                </Col>

            </Row>
            <Row>
                <Col className="text-center">
                    <label>Εμπορική Ονομασία</label>
                    <span>{props.drugName}</span>
                </Col>
                <Col className="text-center">
                    <label>ATC Δραστική Ουσία</label>
                    <span>{props.ATC_name}</span>
                </Col>

            </Row>
            <Row className="justify-condtent-md-text-start">
                <Col className="text-center" md={2}>
                    <label>Ποσότητα</label>
                    <span>{props.quantity}</span>
                </Col>
                <Col className="text-center" md={2}>
                    <label>Συχνότητα</label>
                    <span>{props.frequency}</span>
                </Col>
            </Row>
        </Fragment>
    );
}

export default TherapeiaListItem;