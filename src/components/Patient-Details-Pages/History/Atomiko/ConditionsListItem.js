import { Container, Row, Col } from "react-bootstrap";


const ConditionsListItem = (props) => {
    return (
        <Container>
            <Row>
                <Col className="text-center" sm={5}><span>{props.condition}</span></Col>
                <Col className="text-center" sm={1}><span>{props.state}</span></Col>
                <Col className="text-center" sm={2}><span>{props.severity}</span></Col>
                <Col className="text-center"><span>{props.dateOfDiagnosis}</span></Col>
                <Col className="text-center" ><span>{props.dateOfHealing}</span></Col>
            </Row>
        </Container>
    );
}

export default ConditionsListItem;