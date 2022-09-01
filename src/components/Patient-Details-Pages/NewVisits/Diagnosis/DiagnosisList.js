import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";
import classes from './DiagnosisList.module.css'
import DiagnosisListItem from "./DiagnosisListItem";

const DiagnosisList = (props) => {
    const visitId=useParams().visitId
   
    const loadHandler =async (event) => {
       
        props.dispatch({type:'oldDiagnosis',payload:{oldDiagnosis:true}})
    }

    return (
        <Container fluid className={classes.diagnosisList}>
            <Row>
                {((props.oldDiagnosis)||(visitId!=='new')) && props.diagnosisList.map((diagnosis) => {
                   
                    return <DiagnosisListItem
                        condition={diagnosis.name}
                        state={diagnosis.state}
                        dateOfDiagnosis={diagnosis.dateOfDiagnosis}
                        dateOfHealing={diagnosis.dateOfHealing}
                        key={diagnosis._id}
                        id={diagnosis._id}
                    />
                })}
                {(props.loadedDiagnosisList.length !== 0) && (!props.oldDiagnosis) && (visitId === 'new') && <Row>
                    <Col className={`text-center ${classes.loadRow}`}>
                        Για να φορτώσετε τις  διαγνώσεις της τελευταίας επίσκεψης πατήστε το κουμπί <button type='button' onClick={loadHandler}>Φόρτωση</button>
                    </Col>
                </Row>}
                {(props.diagnosisList.length === 0) && (!props.addDiagnosis) && (props.oldDiagnosis)&& <Row>
                    <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε μια διάγνωση.</Col>
                </Row>}

            </Row>

        </Container>
    );
}

export default DiagnosisList;