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
            {/* <FilesListItem 
            fileName='thyro.jpg'
            fileType='jpg'/> */}

        </Container>
    );
}

export default FilesList;