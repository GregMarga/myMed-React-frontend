import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import moment from 'moment'
import classes from './DiagnosisList.module.css'
import DiagnosisListItem from "./DiagnosisListItem";

const DiagnosisList = (props) => {
    const visitId = useParams().visitId
    console.log(props)
    const loadHandler = async (event) => {

        props.dispatch({ type: 'oldDiagnosis', payload: { oldDiagnosis: true } })
    }

    return (
        <Container fluid className={classes.diagnosisList}>
            <Row>
                {(((props.oldDiagnosis) || (visitId !== 'new')) || (((props.touchForm)||(props.loadedDiagnosisList.length === 0))&&(props.diagnosisList.length !== 0))) && props.diagnosisList.map((diagnosis) => {
                   
                    return <DiagnosisListItem
                        condition={diagnosis.name}
                        state={diagnosis.state}
                        dateOfDiagnosis={(!!diagnosis.dateOfDiagnosis)?moment(diagnosis.dateOfDiagnosis).format('DD-MM-YYYY'):''}
                        dateOfHealing={(!!diagnosis.dateOfHealing)?moment(diagnosis.dateOfHealing).format('DD-MM-YYYY'):''}
                        date_of_diagnosis={diagnosis.dateOfDiagnosis}
                        date_of_healing={diagnosis.dateOfHealing}
                        key={diagnosis._id}
                        id={diagnosis._id}
                        removeDiagnosisHandler={props.removeDiagnosisHandler}
                        editDiagnosisHanlder={props.editDiagnosisHanlder}
                    />
                })}
                {(props.loadedDiagnosisList.length !== 0) && (!props.addDiagnosis)&& (!props.oldDiagnosis)&&(props.diagnosisList.length === 0) && (visitId === 'new') && <Row>
                    <Col className={`text-center ${classes.loadRow}`}>
                        Για να φορτώσετε τις  διαγνώσεις της τελευταίας επίσκεψης πατήστε το κουμπί <button type='button' onClick={loadHandler}>Φόρτωση</button>
                    </Col>
                </Row>}
                {(((props.diagnosisList.length === 0) && (!props.addDiagnosis) && (props.oldDiagnosis)) || ((props.loadedDiagnosisList.length === 0) &&(!props.touchForm)&& (!props.addDiagnosis))) && <Row>
                    <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε μια διάγνωση.</Col>
                </Row>}

            </Row>

        </Container>
    );
}

export default DiagnosisList;