import { Container, Row, Col } from "react-bootstrap";
import Card from '../../../UI/Card'
import classes from './Therapeia.module.css'
import TherapeiaList from "./TherapeiaList";
import TherapeiaForm from "./TherapeiaForm";
import { useState } from "react";


const Therapeia = (props) => {
    const [therapeiaList, setTherapeiaList] = useState([]);
    const [addTherapeia, setAddTherapeia] = useState(false);
    const openAddForm = (event) => {
        setAddTherapeia(true);
    }

    const addTherapeiaHandler = (therapeia) => {
        setTherapeiaList((prevState) => {
            return [...prevState, therapeia];
        })
        console.log(therapeia);
    }


    return (
        <Container>
            <Card className={classes.therapeiaCard}>
                <TherapeiaList therapeiaList={therapeiaList} addTherapeia={addTherapeia} />
                <Row>
                    <Col>
                        {addTherapeia && <TherapeiaForm addTherapeia={addTherapeia} addTherapeiaHandler={addTherapeiaHandler} diagnosisList={props.diagnosisList}/>}
                        {!addTherapeia && <button className={classes.addCondition} onClick={openAddForm}>Προσθήκη Θεραπείας</button>}
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default Therapeia;