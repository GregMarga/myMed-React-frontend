import { Container, Row, Col } from "react-bootstrap";
import Card from "../../../UI/Card";
import SurgeriesList from "./SurgeriesList";
import SurgeriesForm from './SurgeriesForm';
import classes from './Surgeries.module.css'
import { useState } from "react";

const Surgeries = () => {
    const [surgeriesList, setSurgeriesList] = useState([]);
    const [addSurgery, setAddSurgery] = useState(false);

    const openSurgeryFormHandler = (event) => {
        setAddSurgery(true)
    }

    return (
        <Container>
            <div></div>
            <Card className={classes.surgeriesCard}>
                <Row>
                    <Col className="text-center" sm={4} md={2} >Τίτλος</Col>
                    <Col className="text-center">Τύπος Χειρουργείου</Col>
                    <Col className="text-center">Ημ/νια Εισόδου</Col>
                    <Col className="text-center">Ημ/νία Εξόδου</Col>
                    <Col className="text-center" sm={4} md={2}>Νοσοκομείο</Col>
                    <Col sm={2}></Col>
                </Row>
                {addSurgery && <SurgeriesForm />}
                <SurgeriesList surgeriesList={surgeriesList} addSurgery={addSurgery} />    
                <Row><Col><button onClick={openSurgeryFormHandler}>Προσθήκη Χειρουργείου</button></Col></Row>
            </Card>
        </Container>
    );
}

export default Surgeries;