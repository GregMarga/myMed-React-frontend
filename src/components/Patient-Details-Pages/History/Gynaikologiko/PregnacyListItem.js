import { Row, Col } from "react-bootstrap";

const PregnacyListItem = (props) => {
    return (
        <Row>
            <Col className="text-center">{props.date}</Col>
            <Col className="text-center">{props.gennisi}</Col>
            <Col className="text-center">{props.babyWeight}</Col>
            <Col className="text-center" >{props.comments}</Col>
            <Col sm={2}></Col>
        </Row>
    );
}

export default PregnacyListItem;