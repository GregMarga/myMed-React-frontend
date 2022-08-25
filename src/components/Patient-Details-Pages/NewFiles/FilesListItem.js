import { Row, Col } from "react-bootstrap";

const FilesListItem = (props) => {
    return (
        <Row>
            <Col className="text-center" sm={4} md={2}>{props.fileName}</Col>
            <Col className="text-center" sm={4} md={2}>{props.fileType}</Col>
            <Col className="text-center" sm={4} md={2}>{props.dateOfDiagnosis}</Col>
            <Col className="text-center" sm={4} md={2}>{props.dateOfVisit}</Col>
            <Col sm={2} className="text-center"></Col>
        </Row>
    );
}

export default FilesListItem;