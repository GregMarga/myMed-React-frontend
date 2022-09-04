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
        props.dispatch({ type: 'touchTherapeia', payload: { touchTherapeiaForm:  true} })
    }

    const addTherapeiaHandler = (newTherapeia) => {
        props.dispatch({ type: 'addTherapeiaList', payload: { therapeia:  newTherapeia} })
        // props.setTherapeiaList((prevState) => {
        //     return [...prevState, therapeia];
        // })
        console.log(newTherapeia);
    }
    const removeTherapeiaHandler = (therapeiaIdToDelete) => {
        let therapeiaList=props.state.therapeiaList.filter(therapeia=>{
            return therapeia._id!==therapeiaIdToDelete
        })
       
        props.dispatch({ type: 'removeTherapeiaList', payload: { therapeiaList:  therapeiaList} })
    }


    return (
        <Container>
            <Card className={classes.therapeiaCard}>
                <TherapeiaList touchForm={props.state.touchTherapeiaForm} loadedTherapeiaList={props.loadedTherapeiaList} therapeiaList={props.therapeiaList} oldTherapeia={props.state.oldTherapeia} dispatch={props.dispatch} addTherapeia={addTherapeia} removeTherapeiaHandler={removeTherapeiaHandler}/>
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