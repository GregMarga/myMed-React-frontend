import { Row, Col } from "react-bootstrap";
import classes from './FarmakaListItem.module.css';
import EditButton from '../../UI/EditButton'
import FarmakaEditForm from "./FarmakaEditForm";
import DeleteButton from '../../UI/DeleteButton'
import { useHttpClient } from "../../../hooks/http-hook";
import { Fragment, useContext,useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { PatientContext } from "../../../context/patient-context";
import moment from "moment";


const FarmakaListItem = (props) => {
    const [editFarmako, setEditFarmako] = useState(false)
    const { sendRequest, error, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);

    const editHanlder = (event) => {
        setEditFarmako(true)
    }

    const clickHandler = async (event) => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/farmaka/${props.id}`, 'DELETE', null, {
                Authorization: 'Bearer ' + auth.token
            }
            );
        } catch (err) { console.log(err) }
        props.removeFarmakoHandler(props.id)
    }

    return (
        <Fragment>
            {!editFarmako && <Row className={classes.farmakoListItem}>
                <Col className="text-center" sm={4} md={3}>{props.farmakoName}</Col>
                <Col className="text-center" sm={4} md={3}>{props.farmakoType}</Col>
                <Col className="text-center" sm={4} md={2}>{(!!props.dateOfStart) ? moment(props.dateOfStart).format('DD-MM-YYYY') : ''}</Col>
                <Col className="text-center" sm={4} md={2}>{(!!props.dateOfEnd) ? moment(props.dateOfEnd).format('DD-MM-YYYY') : ''}</Col>
                <Col sm={1} className="text-end">
                    <EditButton onClick={editHanlder} />
                </Col>
                <Col sm={1} className="text-start">
                    <DeleteButton onClick={clickHandler} />
                </Col>
            </Row>}
            {editFarmako && <FarmakaEditForm
                farmakoName={props.farmakoName}
                farmakoType={props.farmakoType}
                dateOfStart={props.dateOfStart}
                dateOfEnd={props.dateOfEnd}
                setEditFarmako={setEditFarmako}
                id={props.id}
                editFarmakoHandler={props.editFarmakoHandler}
            />}
        </Fragment>
    );
}

export default FarmakaListItem;