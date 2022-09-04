import { Row, Col } from "react-bootstrap";
import classes from './FarmakaListItem.module.css';
import DeleteButton from '../../UI/DeleteButton'
import { useHttpClient } from "../../../hooks/http-hook";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";
import { PatientContext } from "../../../context/patient-context";
import moment from "moment";


const FarmakaListItem = (props) => {
    console.log(props.id)
    const {sendRequest,error,clearError}=useHttpClient();
    const auth=useContext(AuthContext);
    const patientContext=useContext(PatientContext);

    const clickHandler = async (event) => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/farmaka/${props.id}`, 'DELETE', null, {
                Authorization: 'Bearer ' + auth.token
            }
            );
        } catch (err) { console.log(err) }
        props.removeFarmakoHandler(props.id)
    }

    return (
        <Row className={classes.farmakoListItem}>
            <Col className="text-center" sm={4} md={3}>{props.farmakoName}</Col>
            <Col className="text-center" sm={4} md={3}>{props.farmakoType}</Col>
            <Col className="text-center" sm={4} md={2}>{(!!props.dateOfStart)?moment(props.dateOfStart).format('DD-MM-YYYY'):''}</Col>
            <Col className="text-center" sm={4} md={2}>{(!!props.dateOfEnd)?moment(props.dateOfEnd).format('DD-MM-YYYY'):''}</Col>
            <Col sm={2} className="text-center">
                <DeleteButton onClick={clickHandler} />
            </Col>
        </Row>
    );
}

export default FarmakaListItem;