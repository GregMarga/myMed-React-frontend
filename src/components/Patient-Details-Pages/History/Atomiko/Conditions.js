import { Container, Row, Col } from "react-bootstrap";
import Card from '../../../UI/Card'
import classes from './Conditions.module.css'
import ConditionsList from "./ConditionsList";
import { useState } from "react";
import ConditionsForm from "./ConditionsForms";
import ConditionsHeader from './ConditionsHeader'



const Conditions = (props) => {
    const [conditionsList, setConditionsList] = useState([]);
    const [addCondition, setAddCondition] = useState(false);
    const openAddForm = (event) => {
        setAddCondition(true);
    }

    const addConditionHandler = (condition) => {
        setConditionsList((prevState) => {
            return [...prevState, condition];
        })
        console.log(condition);
    }


    return (
        <Container >
            <Row><Col className="text-center"><div className={classes.title}><h4>Παθήσεις</h4></div></Col></Row>
            <Card className={classes.conditionsCard}>
                <ConditionsHeader />

                {addCondition && <ConditionsForm setAddCondition={setAddCondition} addConditionHandler={addConditionHandler} />}
                <ConditionsList addCondition={addCondition} conditionsList={conditionsList} />
                
                <Row>
                    <Col>
                        {!addCondition && <button className={classes.addCondition} onClick={openAddForm}>Προσθήκη Πάθησης</button>}
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default Conditions;