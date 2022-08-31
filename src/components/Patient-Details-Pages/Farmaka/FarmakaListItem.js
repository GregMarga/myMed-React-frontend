import { Row, Col } from "react-bootstrap";
import classes from './FarmakaListItem.module.css';
import SmallDeleteButton from '../../UI/SmallDeleteButton'
import { useHttpClient } from "../../../hooks/http-hook";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";
import { PatientContext } from "../../../context/patient-context";


const FarmakaListItem = (props) => {
    console.log(props.id)
    const {sendRequest,error,clearError}=useHttpClient();
    const auth=useContext(AuthContext);
    const patientContext=useContext(PatientContext);

    const clickHandler = async (event) => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/630f258526f26797265a226c/farmaka/${props.id}`, 'DELETE', null, {
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
            <Col className="text-center" sm={4} md={2}>{props.dateOfStart}</Col>
            <Col className="text-center" sm={4} md={2}>{props.dateOfEnd}</Col>
            <Col sm={2} className="text-center">
                <SmallDeleteButton onClick={clickHandler} />
            </Col>
        </Row>
    );
}

export default FarmakaListItem;