import { Container, Row, Col } from "react-bootstrap";
import classes from './ConditionsList.module.css'
import ConditionsListItem from "./ConditionsListItem";
import { v4 as uuid } from 'uuid';


const ConditionsList = (props) => {
   

    return (
        <Container fluid className={classes.conditionsList}>
            <Row>
                {props.conditionsList.map((condition) => {
                    return <ConditionsListItem
                        condition={condition.name}
                        state={condition.state}
                        dateOfDiagnosis={condition.dateOfDiagnosis}
                        dateOfHealing={condition.dateOfHealing}
                        key={condition.id}
                        id={condition.id}
                        removeConditionHandler={props.removeConditionHandler}
                    />
                })}
                {(props.conditionsList.length === 0)&&(!props.addCondition) && <Row>
                    <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε μια πάθηση.</Col>
                </Row>}
                {/* <Col xs={5} className="text-center">A04.0 Εντερίτιδα  από εντεροπαθογόνο κολοβακτηρίδιο [Escherichia coli]</Col>
                <Col className="text-center" xs={1}>Χρόνια</Col>
                <Col className="text-center">Μέτρια</Col>
                <Col className="text-center">25/3/2019</Col>
                <Col className="text-center">-</Col> */}
                {/* <Col className="text-center">Προσθέστε μια πάθηση.</Col> */}
            </Row>

        </Container>
    );
}

export default ConditionsList;