import { Row, Col } from "react-bootstrap";
import classes from './FilesListItem.module.css'
import SmallDeleteButton from '../../UI/SmallDeleteButton'
import { useHttpClient } from "../../../hooks/http-hook";
import { PatientContext } from "../../../context/patient-context";
import { AuthContext } from "../../../context/auth-context";
import { useContext } from "react";


const FilesListItem = (props) => {
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);


    const clickHandler = async (event) => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/uploads/exams/${props.id}`, 'DELETE', null, {
                Authorization: 'Bearer ' + auth.token
            }
            );
        } catch (err) { console.log(err) }
        props.removeFileHandler(props._id)
    }


    return (
        <Row className={classes.filesListItem}>
            <Col className="text-center" sm={4} md={4}>{props.fileName}</Col>
            <Col className="text-center" sm={4} md={2}>{props.fileType}</Col>
            <Col className="text-center" sm={4} md={2}>{props.dateOfDiagnosis}</Col>
            <Col className="text-center" sm={4} md={2}>{props.dateOfVisit}</Col>
            <Col sm={2} className="text-center">
                {!isLoading && <SmallDeleteButton onClick={clickHandler} />}
                <a href={`http://localhost:5000/uploads/exams/${props.path}`} target="_blank">προβολή</a>
            </Col>
        </Row>
    );
}

export default FilesListItem;