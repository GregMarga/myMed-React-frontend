import { Container, Row, Col } from 'react-bootstrap';
import FilesListItem from './FilesListItem';
import classes from './filesList.module.css';


const FilesList = (props) => {
    console.log(props.files)
    return (
        <Container fluid className={classes.filesList}>
            {props.files.map((file) => {
                return <FilesListItem
                    key={file}
                    fileName={file}
                />
            })}
            {(props.files.length === 0) &&
                <Row>
                    <Col className='text-center'>There are no files for this patient</Col>
                </Row>
            }

        </Container>
    );
}

export default FilesList;