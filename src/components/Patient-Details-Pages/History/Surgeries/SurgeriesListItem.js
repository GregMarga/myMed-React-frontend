import { Row, Col } from "react-bootstrap";

const SurgeriesListItem = (props) => {
    return (
        <Row>
            <Col className="text-center">{props.title}</Col>
            <Col className="text-center">{props.dateOfEntrance}</Col>
            <Col className="text-center">{props.dateOFExit}</Col>
            <Col className="text-center" sm={4} md={2}>{props.hospital}</Col>
            <Col sm={2}></Col>
        </Row>
    );
}

export default SurgeriesListItem;