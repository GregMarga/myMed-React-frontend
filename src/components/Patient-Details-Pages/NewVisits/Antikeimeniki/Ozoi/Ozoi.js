import { useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
import Card from "../../../../UI/Card";
import classes from './Ozoi.module.css';
import OzoiHeader from "./OzoiHeader";
import OzosForm from "./OzosForm";
import OzoiList from "./OzoiList";


const Ozoi=(props)=>{
    const [addOzos,setAddOzos]=useState(false)


    return (
        <Container>
            <Card className={classes.ozoiCard}>
                <OzoiHeader />
                {addOzos && <OzosForm addOzosHandler={props.addOzosHandler} setAddOzos={setAddOzos} />}
                <OzoiList addOzos={addOzos} ozosList={props.ozosList} removeOzosHandler={props.removeOzosHandler} />

                <Row>
                    {!addOzos && <Col><button className={classes.addOzos} onClick={() => { setAddOzos(true) }}>Προσθήκη Όζου</button></Col>}
                </Row>
            </Card>

        </Container>
    );
}

export default Ozoi;
