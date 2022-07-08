import { Container } from 'react-bootstrap';
import classes from './LabAnalysis.module.css';
import ListsHeader from '../../ListsHeader';
import LabsList from './LabsList';
import Card from "../../UI/Card";
import Button from '../../UI/Button';
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useEffect, useState, useContext, Fragment } from "react";
import { AuthContext } from "../../../context/auth-context";
import ErrorModal from '../../UI/ErrorModal';
import DeleteModal from "../../UI/DeleteModal";
import Backdrop from "../../UI/Backdrop";
import { useHttpClient } from "../../../hooks/http-hook";
import { useLocation } from 'react-router-dom';




const LabAnalysis = (props) => {
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const [loadedLabs, setLoadedLabs] = useState([]);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [labTestToDelete, setLabTestToDelete] = useState({ id: '', type: '' });

    const auth = useContext(AuthContext);

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('visitId');

    useEffect(() => {
        const fetchLabTests = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/patients/${props.patientId}/lab_tests?visitId=${query}`
                    , 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setLoadedLabs(responseData);
            } catch (err) {
                console.log(err);
            }
        };
        fetchLabTests();
    }, [sendRequest, query]);

    function deleteHandler(id, type) {
        setDeleteModalIsOpen(true);
        setLabTestToDelete({ id: id, type: type });
    }

    async function deleteLabTestHandler() {
        let deletedLabTest
        if (labTestToDelete.type === 'blood') {
            deletedLabTest = await sendRequest(`http://localhost:5000/patients/${props.patientId}/lab_tests/blood/${labTestToDelete.id}`, 'DELETE', null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                });
        }
        else if (labTestToDelete.type === 'parathyro') {
            deletedLabTest = await sendRequest(`http://localhost:5000/patients/${props.patientId}/lab_tests/parathyro/${labTestToDelete.id}`, 'DELETE', null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                });

        }
        setLoadedLabs(prevTests => {
            return prevTests.filter(test => test._doc._id !== deletedLabTest._id);
        })
        setDeleteModalIsOpen(false);
    }
    function closeDeleteModal() {
        setDeleteModalIsOpen(false);
    }


    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            {!isLoading&&<Container fluid className={classes.labAnalysis}>
                <Card className={classes.cardLab}>
                    <ListsHeader type='Τύπος Εξέτασης' date='Ημερομηνία Εξέτασης' diagnosis='Ημερομηνία Επίσκεψης' />
                    <LabsList labs={loadedLabs} onDelete={deleteHandler} visitId={query}/>
                    {deleteModalIsOpen && <DeleteModal onConfirm={deleteLabTestHandler} onCancel={closeDeleteModal} description="Do you want to proceed and delete this visit?Please note that it can't be undone once thereafter." />}
                    {deleteModalIsOpen && <Backdrop onClick={closeDeleteModal} />}
                </Card>
                <Button />

            </Container>}
        </Fragment>
    );
};

export default LabAnalysis;