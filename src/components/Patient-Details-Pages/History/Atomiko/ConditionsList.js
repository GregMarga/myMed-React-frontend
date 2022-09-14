import { Container, Row, Col } from "react-bootstrap";
import classes from './ConditionsList.module.css'
import ConditionsListItem from "./ConditionsListItem";
import moment from 'moment'


const ConditionsList = (props) => {
    
    return (
        <Container fluid className={classes.conditionsList}>
            <Row>
                {props.conditionsList.map((condition) => {
                    
                    return <ConditionsListItem
                        condition={condition.name}
                        status={condition.status}
                        dateOfDiagnosis={(!!condition.dateOfDiagnosis)?moment(condition.dateOfDiagnosis).format('DD-MM-YYYY'):''}
                        dateOfHealing={(!!condition.dateOfHealing)?moment(condition.dateOfHealing).format('DD-MM-YYYY'):''}
                        date_of_diagnosis={condition.dateOfDiagnosis}
                        date_of_healing={condition.dateOfHealing}
                        key={condition._id}
                        id={condition._id}
                        openDeleteModal={props.openDeleteModal}
                        removeConditionHandler={props.removeConditionHandler}
                        editConditionHandler={props.editConditionHandler}
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