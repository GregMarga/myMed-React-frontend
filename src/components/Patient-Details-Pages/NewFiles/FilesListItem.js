import { Row, Col } from "react-bootstrap";
import classes from './FilesListItem.module.css'
import SmallDeleteButton from '../../UI/SmallDeleteButton'
import { useHttpClient } from "../../../hooks/http-hook";
import { PatientContext } from "../../../context/patient-context";
import { AuthContext } from "../../../context/auth-context";
import { useContext } from "react";


const FilesListItem = (props) => {
    const {sendRequest,error,clearError}=useHttpClient();
    const auth=useContext(AuthContext);
    const patientContext=useContext(PatientContext);
    console.log(props)

    const clickHandler=async (event)=>{
        try{
            const responseData = await sendRequest(`http://localhost:5000/patients/630ce238394ce3043ab038c8/uploads/exams/${props.id}`, 'DELETE', null, {
                Authorization: 'Bearer ' + auth.token
            }
            );
        }catch(err){console.log(err)}
        props.removeFileHandler(props.id)
    }


    return (
        <Row className={classes.filesListItem}>
            <Col className="text-center" sm={4} md={4}>{props.fileName}</Col>
            <Col className="text-center" sm={4} md={2}>{props.fileType}</Col>
            <Col className="text-center" sm={4} md={2}>{props.dateOfDiagnosis}</Col>
            <Col className="text-center" sm={4} md={2}>{props.dateOfVisit}</Col>
            <Col sm={2} className="text-center">
                <SmallDeleteButton onClick={clickHandler}/>
            </Col>
        </Row>
    );
}

export default FilesListItem;