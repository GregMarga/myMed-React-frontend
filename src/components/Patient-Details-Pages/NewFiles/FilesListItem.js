import { Row, Col } from "react-bootstrap";
import classes from './FilesListItem.module.css'
import DeleteButton from '../../UI/DeleteButton'
import ViewButton from "../../UI/ViewButton";
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
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/uploads/exams/${props.id}`, 'DELETE', null, {
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
            <Col sm={1} className="text-end">
                <a href={`${process.env.REACT_APP_BACKEND_URL}/uploads/exams/${props.path}`} target="_blank"><ViewButton /></a>
            </Col>
            <Col sm={1} className="text-start">
                {!isLoading && <DeleteButton onClick={clickHandler} />}
            </Col>
        </Row>
    );
}

export default FilesListItem;