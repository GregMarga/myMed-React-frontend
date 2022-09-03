import { Row, Col } from "react-bootstrap";
import classes from './OzoiListItem.module.css';
import SmallDeleteButton from '../../../../UI/SmallDeleteButton'
import { useHttpClient } from "../../../../../hooks/http-hook";
import { useContext } from "react";
import { AuthContext } from "../../../../../context/auth-context";
import { PatientContext } from "../../../../../context/patient-context";
import moment from "moment";


const OzoiListItem = (props) => {
    console.log(props.id)
    const {sendRequest,error,clearError}=useHttpClient();
    const auth=useContext(AuthContext);
    const patientContext=useContext(PatientContext);

    const clickHandler = async (event) => {
        // try {
        //     const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/farmaka/${props.id}`, 'DELETE', null, {
        //         Authorization: 'Bearer ' + auth.token
        //     }
        //     );
        // } catch (err) { console.log(err) }
        props.removeOzosHandler(props.id)
    }

    return (
        <Row className={classes.ozoiListItem}>
            <Col sm={4} md={2} className='text-center'> {props.name}</Col>
            <Col sm={4} md={2} className='text-center'> {props.length}</Col>
            <Col sm={4} md={2} className='text-center'>{props.height}</Col>
            <Col sm={4} md={2} className='text-center'>{props.depth}</Col>
            <Col sm={4} md={2} className='text-center'>{(!!props.dateOfFinding)?moment(props.dateOfFinding).format('DD-MM-YYYY'):''}</Col>
            <Col sm={2}>
                <SmallDeleteButton type='button' onClick={clickHandler}/>
            </Col>
        </Row>
    );
}

export default OzoiListItem;