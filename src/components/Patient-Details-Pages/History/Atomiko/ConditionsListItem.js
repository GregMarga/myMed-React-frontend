import { Row, Col } from "react-bootstrap";
import classes from './ConditionsListItem.module.css'
import DeleteButton from '../../../UI/DeleteButton'
import EditButton from "../../../UI/EditButton";
import ConditionsEditForm from "./ConditionEditForm";
import { Fragment, useState } from "react";


const ConditionsListItem = (props) => {
    // console.log(props)
    const [editForm, setEditForm] = useState(false)
    const clickHandler = (event) => {
        props.removeConditionHandler(props.id)
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
                <Col className={`text-end ${classes.editButton}`} sm={1}>{
                    (!!props.editConditionHandler) && <EditButton onClick={editHanlder}/>
                }</Col>
                <Col sm={1} className="text-start">
                    <DeleteButton onClick={clickHandler} />
                </Col>
            </Row>}
            {editForm && <ConditionsEditForm 
                            setEditForm={setEditForm}
                            condition={props.condition}
                            editConditionHandler={props.editConditionHandler}
                            status={props.status}
                            dateOfDiagnosis={props.date_of_diagnosis}
                            dateOfHealing={props.date_of_healing}
                            id={props.id}
            />}
        </Fragment>
    );
}

export default ConditionsListItem;