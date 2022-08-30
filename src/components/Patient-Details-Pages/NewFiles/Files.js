import { Container, Row, Col } from "react-bootstrap"
import Card from "../../UI/Card"
import FilesHeader from "./FilesHeaders"
import FilesList from './FilesList'
import FilesForm from "./FileForm"
import classes from './Files.module.css';
import { useState, useContext } from "react"
import { AuthContext } from '../../../context/auth-context'
import SaveButton from '../../UI/SaveButton';

const Files = (props) => {
    const auth = useContext(AuthContext);

    const [filesList, setFilesList] = useState([])
    const [addFile, setAddFile] = useState(false);

    const submitHandler = () => { }


    const addFileHandler = (file) => {
        setFilesList((prevState) => {
            return [...prevState, file];
        })
    }

    const removeFileHandler = (fileIdToDelete) => {
        setFilesList((prevState) => {
            return prevState.filter(file=>{
                return file.id!==fileIdToDelete
            })
        })
    }
  

    return (
        <Container>
            <Card className={(props.info)?classes.filesCard2:classes.filesCard}>
                <FilesHeader />
                {addFile && <FilesForm addFileHandler={addFileHandler} setAddFile={setAddFile} />}
                <FilesList filesList={filesList} addFile={addFile} removeFileHandler={removeFileHandler}/>

                <Row>
                    {!addFile && <Col><button className={classes.addFile} onClick={() => { setAddFile(true) }}>Προσθήκη Αρχείου</button></Col>}
                </Row>
            </Card>
            <Row>
                <Col>
                    {(filesList.length > 0) && <SaveButton onClick={submitHandler} />}
                </Col>
            </Row>
        </Container>
    );
}

export default Files;