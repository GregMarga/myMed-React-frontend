import { Container, Row, Col } from "react-bootstrap";
import Card from '../../../UI/Card'
import classes from './Therapeia.module.css'
import TherapeiaList from "./TherapeiaList";
import TherapeiaForm from "./TherapeiaForm";
import { useState } from "react";


const Therapeia = (props) => {
    
    const [addTherapeia, setAddTherapeia] = useState(false);
    const openAddForm = (event) => {
        setAddTherapeia(true);
    }

    const addTherapeiaHandler = (therapeia) => {
        props.setTherapeiaList((prevState) => {
            return [...prevState, therapeia];
        })
        console.log(therapeia);
    }
    const removeTherapeiaHandler = (therapeiaIdToDelete) => {
        props.setTherapeiaList((prevState) => {
            return prevState.filter(therapeia=>{
                return therapeia._id!==therapeiaIdToDelete
            })
        })
    }


    return (
        <Container>
            <Card className={classes.therapeiaCard}>
                <TherapeiaList therapeiaList={props.therapeiaList} addTherapeia={addTherapeia} removeTherapeiaHandler={removeTherapeiaHandler}/>
                <Row>
                    <Col>
                        {addTherapeia && <TherapeiaForm addTherapeia={addTherapeia} addTherapeiaHandler={addTherapeiaHandler} diagnosisList={props.diagnosisList} setAddTherapeia={setAddTherapeia}/>}
                        {!addTherapeia && <button className={classes.addCondition} onClick={openAddForm}>Προσθήκη Θεραπείας</button>}
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default Therapeia;