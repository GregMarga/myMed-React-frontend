import { Row, Col } from "react-bootstrap";
import classes from './VisitsListItem.module.css';
// import SmallDeleteButton from '../../UI/SmallDeleteButton'
import { Link } from 'react-router-dom';
import { useHttpClient } from "../../../hooks/http-hook";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";
import { PatientContext } from "../../../context/patient-context";


const VisitsListItem = (props) => {
    console.log(props.id)
    const { sendRequest, error, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);

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
        <Row className={classes.visitsListItem}>
            <Col className="text-center" sm={3} md={3}><Link to={`/patients/${props.id}/visits/${props.id}`} style={{ textDecoration: 'none', color: 'black' }}>{props.visitDate}</Link></Col>
            <Col className="text-center" sm={4} md={4}><Link to={`/patients/${props.id}/visits/${props.id}`} style={{ textDecoration: 'none', color: 'black' }}>{props.geniki_eikona}</Link></Col>
            <Col className="text-center" sm={4} md={3}><Link to={`/patients/${props.id}/visits/${props.id}`} style={{ textDecoration: 'none', color: 'black' }}>{props.aitia_proseleusis}</Link></Col>
            <Col className="text-center" sm={4} md={2}><Link to={`/patients/${props.id}/visits/${props.id}`} style={{ textDecoration: 'none', color: 'black' }}></Link></Col>
            {/* <Col sm={2} className="text-center">
                <SmallDeleteButton onClick={clickHandler} />
            </Col> */}
        </Row>
    );
}

export default VisitsListItem;