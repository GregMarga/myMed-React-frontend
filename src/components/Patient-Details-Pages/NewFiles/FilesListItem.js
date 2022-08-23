import { Row, Col } from "react-bootstrap";

const FilesListItem = (props) => {
    return (
        <Row>
            <Col className="text-center">{props.fileName}</Col>
            <Col className="text-center">{props.fileType}</Col>
            <Col className="text-center">{props.dateOfDiagnosis}</Col>
            <Col className="text-center">{props.dateOfVisit}</Col>
            <Col sm={2} className="text-center"></Col>
        </Row>
    );
}

export default FilesListItem;