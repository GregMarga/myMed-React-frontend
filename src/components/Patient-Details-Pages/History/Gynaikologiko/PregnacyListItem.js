import { Row, Col } from "react-bootstrap";
import moment from "moment";



const PregnacyListItem = (props) => {
    return (
        <Row>
            <Col className="text-center">{(!!props.date)?moment(props.date).format('DD-MM-YYYY'):''}</Col>
            <Col className="text-center">{props.gennisi}</Col>
            <Col className="text-center">{props.babyWeight}</Col>
            <Col className="text-center" >{props.comments}</Col>
            <Col sm={2}></Col>
        </Row>
    );
}

export default PregnacyListItem;