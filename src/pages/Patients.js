import { Container } from 'react-bootstrap';
import PatientsList from '../components/PatientsList';
import PatientsListHeader from '../components/PatientsListHeader';
import Backdrop from '../components/UI/Backdrop';
import classes from './Patients.module.css';
import Modal from '../components/UI/Modal';
import DeleteModal from '../components/UI/DeleteModal';
import EditPatient from '../components/EditPatient';
import ErrorModal from '../components/UI/ErrorModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useHttpClient } from '../hooks/http-hook';
import { useState, useEffect, useContext, useReducer } from 'react';
import { AuthContext } from '../context/auth-context';

const defaultSearch = { sirname: '', name: '', diagnosis: '', age: '', tel: '', amka: '' };

function reducer(state, action) {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.payload.name };
        case 'sirname':
            return { ...state, sirname: action.payload.sirname };
        case 'diagnosis':
            return { ...state, diagnosis: action.payload.diagnosis };
        case 'tel':
            return { ...state, tel: action.payload.tel };
        case 'amka':
            return { ...state, amka: action.payload.amka };
        case 'clear': {
            return defaultSearch;
        }
        default:
            return state;
    }


}

const Patients = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [loadedPatients, setLoadedPatients] = useState([]);
    const [patientToDelete, setPatientToDelete] = useState();
    const [patientToEdit, setPatientToEdit] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);


    const [state, dispatch] = useReducer(reducer, defaultSearch);


    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/patients/getPatients/${auth.userId}?name=${state.name}&sirname=${state.sirname}&diagnosis=${state.diagnosis}&tel=${state.tel}&amka=${state.amka}`, 'GET', null, {
                    Authorization: 'Bearer ' + auth.token
                });
                console.log(responseData)
                setLoadedPatients(responseData);
            } catch (err) { }

        };
        setTimeout(fetchPatients);
    }, [sendRequest, state]);


    function addPatientHandler() {
        setModalIsOpen(true);
    }

    function closeHandler() {
        setModalIsOpen(false);
    }
    function deleteHandler(patientId) {
        setDeleteModalIsOpen(true);
        setPatientToDelete(patientId);
    }
    function closeDeleteModal() {
        setDeleteModalIsOpen(false);
    }
    function editHandler(patientId) {
        setEditModalIsOpen(true);
        setPatientToEdit(patientId);
    }
    function closeEditModal() {
        setEditModalIsOpen(false);
    }
    function submitPatientHandler(patient) {
        setLoadedPatients(prevPatients => {
            return [patient, ...prevPatients];
        });
    }
    async function deletePatientHandler() {
        const responseDeletedPatient = await sendRequest(`http://localhost:5000/patients/${patientToDelete}`, 'DELETE', null, {
            Authorization: 'Bearer ' + auth.token
        }
        );
        setLoadedPatients(prevPatients => {
            return prevPatients.filter(patient => patient._id !== responseDeletedPatient._id)
        })
        setDeleteModalIsOpen(false);
    }
    return (
        <div className={classes.test}>
            {!!error && <ErrorModal error={error} onClear={clearError} />}

            <Container>
                <PatientsListHeader dispatch={dispatch} />
                {isLoading && <LoadingSpinner />}

                {!isLoading && loadedPatients && <PatientsList patients={loadedPatients} onDelete={deleteHandler} onEdit={editHandler} />}
                <button onClick={addPatientHandler} className={classes.addButton}>Add Patient +</button>
                {modalIsOpen && <Modal onClose={closeHandler} onSubmit={submitPatientHandler} patients={loadedPatients} />}
                {modalIsOpen && !error && <Backdrop onClick={closeHandler} />}
                {deleteModalIsOpen && <DeleteModal onConfirm={deletePatientHandler} onCancel={closeDeleteModal} description="Do you want to proceed and delete this patient?Please note that it can't be undone once thereafter." />}
                {deleteModalIsOpen && !error && <Backdrop onClick={closeDeleteModal} />}
                {editModalIsOpen && !error && <Backdrop onClick={closeEditModal} />}
                {editModalIsOpen && <EditPatient onClose={closeEditModal} patientId={patientToEdit} />}

            </Container>
        </div>
    );
};

export default Patients;