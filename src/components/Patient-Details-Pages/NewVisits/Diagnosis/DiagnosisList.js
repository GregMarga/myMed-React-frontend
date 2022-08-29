import { Container, Row, Col } from "react-bootstrap";
import classes from './DiagnosisList.module.css'
import DiagnosisListItem from "./DiagnosisListItem";

const DiagnosisList = (props) => {
    console.log(props.diagnosisList)

    return (
        <Container fluid className={classes.diagnosisList}>
            <Row>
                {props.diagnosisList.map((diagnosis) => {
                    return <DiagnosisListItem
                        condition={diagnosis.name}
                        state={diagnosis.state}
                        dateOfDiagnosis={diagnosis.dateOfDiagnosis}
                        dateOfHealing={diagnosis.dateOfHealing}
                        key={diagnosis._id}
                        id={diagnosis._id}
                    />
                })}
                {(props.diagnosisList.length === 0) && (!props.addDiagnosis) && <Row>
                    <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε μια διάγνωση.</Col>
                </Row>}

            </Row>

        </Container>
    );
}

export default DiagnosisList;