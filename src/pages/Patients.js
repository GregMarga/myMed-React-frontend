import { Container } from 'react-bootstrap';
import PatientsList from '../components/PatientsList';
import PatientsListHeader from '../components/PatientsListHeader';
import Backdrop from '../components/UI/Backdrop';
import classes from './Patients.module.css';
import Modal from '../components/UI/Modal';
import DeleteModal from '../components/UI/DeleteModal';
import { useState, useEffect } from 'react';

const Patients = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [loadedPatients, setLoadedPatients] = useState([]);
    const [patientToDelete,setPatientToDelete]=useState();

    useEffect(() => {
        fetch("http://localhost:5000/patients"
        ).then((response) => {
            return response.json()
        })
            .then((data) => {
                setLoadedPatients(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

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
    function closeDeleteModal(){
        setDeleteModalIsOpen(false);
    }

    function submitPatientHandler(patient) {
        setLoadedPatients(prevPatients => {
            return [patient, ...prevPatients];
        });
    }
    async function deletePatientHandler(patient){
        const response=await fetch(`http://localhost:5000/patients/${patientToDelete}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const deletedPatient=await response.json();
        setLoadedPatients(prevPatients=>{
            return prevPatients.filter(patient=>patient._id!==deletedPatient._id)
        })
        setDeleteModalIsOpen(false);
    }
    return (
        <div className={classes.test}>

            <Container>
                <PatientsListHeader />
                <PatientsList patients={loadedPatients} onDelete={deleteHandler} />
                <button onClick={addPatientHandler} className={classes.addButton}>Add Patient +</button>
                {modalIsOpen && <Modal onClose={closeHandler} onSubmit={submitPatientHandler} patients={loadedPatients} />}
                {modalIsOpen && <Backdrop onClick={closeHandler} />}
                {deleteModalIsOpen && <DeleteModal onConfirm={deletePatientHandler} onCancel={closeDeleteModal}/>}
                {deleteModalIsOpen && <Backdrop onClick={closeDeleteModal}/>}

            </Container>
        </div>
    );
};

export default Patients;