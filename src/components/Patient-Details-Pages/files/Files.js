import classes from './files.module.css';
import { Fragment } from "react"
import { Container } from 'react-bootstrap';
import ListsHeader from "../../ListsHeader";
import Card from '../../UI/Card';
import FilesList from './FilesList';
import Button from "../../UI/Button";
import { useContext, useEffect, useState } from 'react';
import { useHttpClient } from '../../../hooks/http-hook';
import { AuthContext } from '../../../context/auth-context';
import ErrorModal from '../../UI/ErrorModal';
import DeleteModal from '../../UI/DeleteModal';
import Backdrop from '../../UI/Backdrop';
import LoadingSpinner from '../../UI/LoadingSpinner';



const Files = (props) => {
    const [loadedFiles, setLoadedFiles] = useState([]);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [fileToDelete, setFileToDelete] = useState();
    const { isLoading, error, clearError, sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);

    // useEffect(() => {
    //     const fetchFiles = async () => {
    //         const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/files`, 'GET', null,
    //             {
    //                 Authorization: 'Bearer ' + auth.token
    //             });

    //         setLoadedFiles(responseData);
    //     }
    //     fetchFiles();
    // }, []);

    const deleteHandler = (fileId) => {
        setDeleteModalIsOpen(true);
        setFileToDelete(fileId);
    }
    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false)
    }

    async function deleteFileHandler() {
        const filteredFiles = await sendRequest(`http://localhost:5000/patients/${props.patientId}/files/${fileToDelete}`, 'DELETE', null,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
        setLoadedFiles(filteredFiles);
        console.log(loadedFiles);
        setDeleteModalIsOpen(false);
    }



    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {!!error && <ErrorModal />}
            {!isLoading && <Container fluid className={classes.files}>
                <Card className={classes.cardsFiles}>
                    <ListsHeader type='Όνομα Αρχείου' date='Ημερομηνία' diagnosis='Τύπος Αρχείου' title />
                    <FilesList files={loadedFiles} onDelete={deleteHandler} />
                    {deleteModalIsOpen && <DeleteModal onConfirm={deleteFileHandler} onCancel={closeDeleteModal} description="Do you want to proceed and delete this file?Please note that it can't be undone once thereafter." />}
                    {deleteModalIsOpen && <Backdrop onClick={closeDeleteModal} />}
                </Card>
                <Button />
            </Container>}
        </Fragment>
    );
}

export default Files;