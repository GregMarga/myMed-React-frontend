import { Row, Col } from "react-bootstrap";
import DeleteButton from "../../../UI/DeleteButton";
import EditButton from "../../../UI/EditButton";
import moment from "moment";
import { Fragment, useState } from "react";
import PregnacyEditForm from "./PregnacyEditForm";



const PregnacyListItem = (props) => {
    const [editForm, setEditForm] = useState(false)
    const deleteHandler = () => {
        props.removePregnacyHandler(props.id)
    }

    return (
        <Fragment>
            {!editForm && <Row>
                <Col className="text-center">{(!!props.date) ? moment(props.date).format('DD-MM-YYYY') : ''}</Col>
                <Col className="text-center">{props.gennisi}</Col>
                <Col className="text-center">{props.babyWeight}</Col>
                <Col className="text-center" >{props.comments}</Col>
                <Col sm={1} className='text-end'>
                    <EditButton onClick={() => { setEditForm(true) }} />
                </Col>
                <Col sm={1} className='text-start'>
                    <DeleteButton onClick={deleteHandler} />
                </Col>
            </Row>}
            {editForm && <PregnacyEditForm
                setEditForm={setEditForm}
                date={props.date}
                gennisi={props.gennisi}
                babyWeight={props.babyWeight}
                comments={props.comments}
                editPregnacyHandler={props.editPregnacyHandler}
                id={props.id}
            />}
        </Fragment>
    );
}

export default PregnacyListItem;