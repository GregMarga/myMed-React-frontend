import { Row, Col } from "react-bootstrap";
import DeleteButton from "../../../UI/DeleteButton";
import EditButton from "../../../UI/EditButton";
import SurgeryEditForm from "./SurgeryEditForm";
import moment from "moment";
import { Fragment, useState } from "react";

const SurgeriesListItem = (props) => {
    
    const [editForm, setEditForm] = useState(false);
    const editHanlder = () => {
        setEditForm(true)
    }
    const deleteHandler = () => {
        props.removeSurgeryHandler(props.id)
    }

    return (
        <Fragment>
            {!editForm && <Row>
                <Col className="text-center">{props.title}</Col>
                <Col className="text-center">{(!!props.dateOfEntrance) ? moment(props.dateOfEntrance).format('DD-MM-YYYY') : ''}</Col>
                <Col className="text-center">{(!!props.dateOfExit) ? moment(props.dateOfExit).format('DD-MM-YYYY') : ''}</Col>
                <Col className="text-center" sm={4} md={2}>{props.hospital}</Col>
                <Col sm={1} className='text-end'>
                    <EditButton onClick={editHanlder} />
                </Col>
                <Col sm={1} className='text-start'>
                    <DeleteButton onClick={deleteHandler} />
                </Col>
            </Row>}
            {editForm && <SurgeryEditForm
                setEditForm={setEditForm}
                title={props.title}
                editSurgeryHandler={props.editSurgeryHandler}
                hospital={props.hospital}
                dateOfEntrance={props.dateOfEntrance}
                dateOfExit={props.dateOfExit}
                id={props.id}
            />}
        </Fragment>
    );
}

export default SurgeriesListItem;