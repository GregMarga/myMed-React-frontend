import { Row, Col } from "react-bootstrap";
import classes from './DiagnosisListItem.module.css'
import DeleteButton from "../../../UI/DeleteButton";
import EditButton from "../../../UI/EditButton";
import { Fragment, useState } from "react";
import DiagnosisEditForm from "./DiagnosisEditForm";
import moment from 'moment'

const DiagnosisListItem = (props) => {
    const [editForm, setEditForm] = useState(false)

    const deleteHanlder = () => {
        props.removeDiagnosisHandler(props.id);
    }
    const editHanlder = () => {
        setEditForm(true)
    }

    return (
        <Fragment>
            {!editForm && <Row className={classes.conditionsListItem}>
                <Col className="text-center" sm={4}><span>{props.condition}</span></Col>
                <Col className="text-center" sm={2}><span>{props.status}</span></Col>
                {/* <Col className="text-center" sm={2}><span>{props.severity}</span></Col> */}
                <Col className="text-center"><span>{props.dateOfDiagnosis}</span></Col>
                <Col className="text-center" ><span>{props.dateOfHealing}</span></Col>
                <Col sm={1} className='text-end'>
                    <EditButton onClick={editHanlder}/>
                </Col>
                <Col sm={1} className='text-start'>
                    <DeleteButton onClick={deleteHanlder} />
                </Col>
            </Row>}
            {editForm&&<DiagnosisEditForm
            id={props.id}
            condition={props.condition}
            status={props.status}
            dateOfDiagnosis={props.date_of_diagnosis}
            dateOfHealing={props.date_of_healing}
            setEditForm={setEditForm}
            editDiagnosisHanlder={props.editDiagnosisHanlder}
            />}
        </Fragment>

    );
}

export default DiagnosisListItem;