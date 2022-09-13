import { Row, Col } from "react-bootstrap";
import classes from './OzoiListItem.module.css';
import DeleteButton from '../../../../UI/DeleteButton'
import EditButton from '../../../../UI/EditButton'
import OzoiEditForm from './OzoiEditForm';
import { useHttpClient } from "../../../../../hooks/http-hook";
import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../../../../../context/auth-context";
import { PatientContext } from "../../../../../context/patient-context";
import moment from "moment";


const OzoiListItem = (props) => {
    const [editForm, setEditForm] = useState(false)
    const { sendRequest, error, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);

    const deleteHandler =  (event) => {
        props.removeOzosHandler(props.id)
    }
    const editHandler = () => {
        setEditForm(true)
    }

    return (
        <Fragment>
            {!editForm && <Row className={classes.ozoiListItem}>
                <Col sm={4} md={2} className='text-center'> {props.name}</Col>
                <Col sm={4} md={2} className='text-center'> {props.length}</Col>
                <Col sm={4} md={2} className='text-center'>{props.height}</Col>
                <Col sm={4} md={2} className='text-center'>{props.depth}</Col>
                <Col sm={4} md={2} className='text-center'>{(!!props.dateOfFinding) ? moment(props.dateOfFinding).format('DD-MM-YYYY') : ''}</Col>
                <Col sm={1} className='text-end'>
                    <EditButton onClick={editHandler} />
                </Col>
                <Col sm={1} className='text-start'>
                    <DeleteButton onClick={deleteHandler} />
                </Col>
            </Row>}
            {editForm && <OzoiEditForm
                id={props.id}
                name={props.name}
                length={props.length}
                identifier={props.identifier}
                height={props.height}
                depth={props.depth}
                dateOfFinding={props.dateOfFinding}
                setEditForm={setEditForm}
                editOzosHanlder={props.editOzosHanlder}
            />}
        </Fragment>
    );
}

export default OzoiListItem;