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
import LoadingSpinner from '../../UI/LoadingSpinner';



const Files = (props) => {
    const [loadedFiles, setLoadedFiles] = useState([]);
    const { isLoading, error, clearError, sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchFiles = async () => {
            const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/files`, 'GET', null,
                {
                    Authorization: 'Bearer ' + auth.token
                });

            setLoadedFiles(responseData);
        }
        fetchFiles();
    }, []);


    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {!!error && <ErrorModal />}
            {!isLoading && <Container fluid className={classes.files}>
                <Card className={classes.cardsFiles}>
                    <ListsHeader type='Όνομα Αρχείου' date='Ημερομηνία' diagnosis='Τύπος Αρχείου' title />
                    <FilesList files={loadedFiles} />
                </Card>
                <Button />
            </Container>}
        </Fragment>
    );
}

export default Files;