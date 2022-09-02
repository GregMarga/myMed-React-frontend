import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import FilesListItem from "./FilesListItem";
import moment from "moment";

const Files = (props) => {    

    return (
       
        <Fragment>
            {props.filesList.map(file => {
                return <FilesListItem
                    fileName={file.name}
                    fileType={file.type}
                    dateOfDiagnosis={(!!file.dateOfDiagnosis)?moment(file.dateOfDiagnosis).format('DD-MM-YYYY'):''}
                    dateOfVisit={(!!file.dateOfVisit)?moment(file.dateOfVisit).format('DD-MM-YYYY'):''}
                    path={file.file.split('\\')[2]}
                    key={file._id}
                    id={file._id}
                    removeFileHandler={props.removeFileHandler}
                />
            })}
            {(props.filesList.length === 0) && (!props.addFile) && <Row>
                <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε ένα αρχείο.</Col>
            </Row>}
        </Fragment>
    );
}

export default Files;