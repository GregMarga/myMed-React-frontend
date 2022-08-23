import { Container, Row, Col } from "react-bootstrap"
import Card from "../../UI/Card"
import FilesHeader from "./FilesHeaders"
import FilesList from './FilesList'
import classes from './Files.module.css';
import { useState, useContext } from "react"
import { AuthContext } from '../../../context/auth-context'
import SaveButton from '../../UI/SaveButton';

const Files = () => {
    const auth = useContext(AuthContext);

    const [filesList, setFilesList] = useState([])
    const [addFile, setAddFile] = useState(false);

    const submitHandler = () => { }

    return (
        <Container>
            <Card className={classes.filesCard}>
                <FilesHeader />
                <FilesList filesList={filesList} addFile={addFile} />

                <Row>
                    <Col><button onClick={()=>{setAddFile(true)}}>Προσθήκη Αρχείου</button></Col>
                </Row>
            </Card>
            <Row>
                <Col><SaveButton onClick={submitHandler} /></Col>
            </Row>
        </Container>
    );
}

export default Files;