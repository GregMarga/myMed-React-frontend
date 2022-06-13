import ListsHeader from "../../ListsHeader";
import classes from './Visits.module.css';
import { Container } from "react-bootstrap";
import VisitsList from "./VisitsList";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/auth-context";
import ErrorModal from '../../UI/ErrorModal';
import DeleteModal from "../../UI/DeleteModal";
import Backdrop from "../../UI/Backdrop";
import { useHttpClient } from "../../../hooks/http-hook";



const Visits = (props) => {
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const [loadedVisits, setLoadedVisits] = useState([]);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [visitToDelete, setVisitToDelete] = useState();

    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/visits`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setLoadedVisits(responseData);
            } catch (err) { }

        };
        fetchHistory();
    }, [sendRequest]);

    function deleteHandler(visitId) {
        setDeleteModalIsOpen(true);
        setVisitToDelete(visitId);
    }
    function closeDeleteModal() {
        setDeleteModalIsOpen(false);
    }
    async function deleteVisitHandler() {
        const deletedVisit = await sendRequest(`http://localhost:5000/patients/${props.patientId}/visits/${visitToDelete}`, 'DELETE', null,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
        setLoadedVisits(prevVisits => {
            return prevVisits.filter(visit => visit._id !== deletedVisit._id)
        })
        setDeleteModalIsOpen(false);
    }


    function addVisitsHandler() { }

    return (

        <Container fluid className={classes.visits}>
            {isLoading && <LoadingSpinner asOverlay />}
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Card className={classes.cardsVisit}>
                <ListsHeader type='Τύπος Επίσκεψης' date='Ημερομηνία' diagnosis='Διάγνωση' />
                {!isLoading && <VisitsList visits={loadedVisits} onDelete={deleteHandler} />}
                {deleteModalIsOpen && <DeleteModal onConfirm={deleteVisitHandler} onCancel={closeDeleteModal} description="Do you want to proceed and delete this visit?Please note that it can't be undone once thereafter."/>}
                {deleteModalIsOpen && <Backdrop onClick={closeDeleteModal} />}
            </Card>
            <Button addHandler={addVisitsHandler} />
        </Container>


    );
};

export default Visits;