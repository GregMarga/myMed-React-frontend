import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";
import classes from './PatientSearch.module.css'

const PatientSearch = () => {

    return (
        <Container className={classes.patientSearch}>
            <Card className={classes.card}>
                <Row>
                    <Col><h4 className={classes.h4s}>Αναζήτηση ασθενή</h4></Col>
                </Row>
                <Row>
                    <Col >
                        <label className={classes.labels}>ΑΜΚΑ Ασθενή</label>
                        <input className={classes.inputs} type='text' />
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default PatientSearch;