import { Row, Col } from "react-bootstrap";
import DeleteButton from "../../../UI/DeleteButton";
import EditButton from "../../../UI/EditButton";
import moment from "moment";



const PregnacyListItem = (props) => {
    const deleteHandler = () => {
        props.removePregnacyHandler(props.id)
    }

    return (
        <Row>
            <Col className="text-center">{(!!props.date) ? moment(props.date).format('DD-MM-YYYY') : ''}</Col>
            <Col className="text-center">{props.gennisi}</Col>
            <Col className="text-center">{props.babyWeight}</Col>
            <Col className="text-center" >{props.comments}</Col>
            <Col sm={1} className='text-end'>
                <EditButton />
            </Col>
            <Col sm={1} className='text-end'>
                <DeleteButton onClick={deleteHandler} />
            </Col>
        </Row>
    );
}

export default PregnacyListItem;