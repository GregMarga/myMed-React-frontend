import { Container, Row, Col } from "react-bootstrap";
import Card from "../../../UI/Card";


const SurgeriesListItem = () => {
    return (
        <Container>
            <Card>
                <Row>
                    <Col>Ημερομηνία</Col>
                    <Col>Γέννηση</Col>
                    <Col>Βάρος Νεογνού(kg)</Col>
                    <Col>Σχόλια</Col>
                </Row>
                <Row><Col><button>Προσθήκη Κύησης</button></Col></Row>
            </Card>
        </Container>
    );
}

export default SurgeriesListItem;