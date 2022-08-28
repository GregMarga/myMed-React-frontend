import { Container, Row, Col } from "react-bootstrap";
import Card from "../../../UI/Card";
import { useState } from "react";
import classes from './Pregnacy.module.css'
import PregnacyForm from "./PregnacyForm";
import PregnaciesList from "./PregnacyList";


const Pregnacy = (props) => {
    const [addPregnacy, setAddPregnacy] = useState(false);


    const addPregnacyHandler = (condition) => {
        props.setPregnaciesList((prevState) => {
            return [...prevState, condition];
        })
        console.log(condition);
    }

    return (
        <Container>
            <Card className={classes.pregnacyCard}>
                <Row className={classes.pregnacyHeader}>
                    <Col className="text-center">Ημερομηνία</Col>
                    <Col className="text-center">Γέννηση</Col>
                    <Col className="text-center">Βάρος Νεογνού(kg)</Col>
                    <Col className="text-center">Σχόλια</Col>
                    <Col sm={2}></Col>
                </Row>
                {addPregnacy && <PregnacyForm setAddPregnacy={setAddPregnacy} addPregnacyHandler={addPregnacyHandler} />}
                {!(addPregnacy) && <PregnaciesList pregnacyList={props.pregnacyList} />}
                <Row><Col><button type='button' onClick={() => { setAddPregnacy(true) }} className={classes.addPregnacy}>Προσθήκη Κύησης</button></Col></Row>
            </Card>
        </Container>
    );
}

export default Pregnacy;