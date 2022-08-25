import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import Collapsible from 'react-collapsible';
import Card from "../../UI/Card";
import Antikeimeniki from "./Antikeimeniki/Antikeimeniki";
import Diagnosis from "./Diagnosis/Diagnosis";
import Therapeia from "./Therapeia/Therapeia";
import classes from './Visit.module.css';

const Visit = () => {
    const [diagnosisList, setDiagnosisList] = useState([]);

    return (
        <form className={classes.visitForm}>
            <Container fluid>
                <Collapsible trigger='Αντικειμενική Εξέταση' transitionTime={200}>
                    <Antikeimeniki />
                </Collapsible>
                <Collapsible trigger='Διαγνώσεις' transitionTime={200}>
                    <Diagnosis diagnosisList={diagnosisList} setDiagnosisList={setDiagnosisList}/>
                </Collapsible>
                <Collapsible trigger='Θεραπεία' transitionTime={200}>
                    <Therapeia diagnosisList={diagnosisList} />
                </Collapsible>
            </Container>
        </form>
    );
}

export default Visit;