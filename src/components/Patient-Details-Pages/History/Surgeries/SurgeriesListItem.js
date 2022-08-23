import { Row, Col } from "react-bootstrap";

const SurgeriesListItem = (props) => {
    return (
        <Row>
            <Col>{props.title}</Col>
            <Col>{props.type}</Col>
            <Col>{props.dateOfEntrance}</Col>
            <Col>{props.dateOFExit}</Col>
            <Col>{props.hospital}</Col>
            <Col sm={1}></Col>
        </Row>
    );
}

export default SurgeriesListItem;