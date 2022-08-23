import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import FilesListItem from "./FilesListItem";

const Files = (props) => {
    return (
        <Fragment>
        {props.filesList.map(file=>{
                <FilesListItem
                    fileName={file.fileName}
                    fileType={file.fileType}
                    dateOfDiagnosis={file.dateOfDiagnosis}
                    dateOfVisit={file.dateOfVisit}
                />
            })}
             {(props.filesList.length === 0) && (!props.addFile) && <Row>
                <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε ένα αρχείο.</Col>
            </Row>}
        </Fragment>
    );
}

export default Files;