import { Container, Row, Col } from "react-bootstrap"
import Card from "../../UI/Card"
import FilesHeader from "./FilesHeaders"
import FilesList from './FilesList'
import FilesForm from "./FileForm"
import classes from './Files.module.css';
import { useState, useContext, useEffect,useCallback } from "react"
import { AuthContext } from '../../../context/auth-context'
import SaveButton from '../../UI/SaveButton';
import { PatientContext } from "../../../context/patient-context"
import { useHttpClient } from "../../../hooks/http-hook"

const Files = (props) => {
    const auth = useContext(AuthContext);
    const patientContext=useContext(PatientContext);
    const {error,clearError,sendRequest,isLoading}=useHttpClient()

    const [filesList, setFilesList] = useState([])
    const [addFile, setAddFile] = useState(false);

    const fetchFiles = useCallback(async () => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/exams`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            console.log(responseData)
            setFilesList(responseData.filesList)


        } catch (err) { }
    }
    )
    useEffect(() => {
        if (!!patientContext.patientId) {
            fetchFiles();
        }
    }, [patientContext.patientId])

    


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
            
        </Container>
    );
}

export default Files;