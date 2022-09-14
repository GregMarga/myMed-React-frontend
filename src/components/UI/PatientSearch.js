import { Container, Row, Col } from "react-bootstrap";
import Card from "./Card";
import classes from './PatientSearch.module.css'
import { useState } from "react";

const PatientSearch = (props) => {
    const [amka, setAmka] = useState();
    const changeAmkaHandler = (event) => {
        const interval = setInterval(props.dispatch({ type: 'amka', payload: { amka: event.target.value } }), 5000);
        setAmka(event.target.value);
        return () => clearInterval(interval);
    }

    return (
        <Container className={classes.patientSearch}>
            <Card className={classes.card}>
                <Row>
                    <Col><h4 className={classes.h4s}>Αναζήτηση ασθενή</h4></Col>
                </Row>
                <Row>
                    <Col md={4} className="text-md-end">
                        <label className={classes.labels}>ΑΜΚΑ Ασθενή</label>
                    </Col>
                    <Col className="text-start" >
                        <input className={classes.inputs} type='text' onChange={changeAmkaHandler} value={amka} />
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default PatientSearch;