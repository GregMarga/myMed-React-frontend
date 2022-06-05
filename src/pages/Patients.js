import { Container } from 'react-bootstrap';
import PatientsList from '../components/PatientsList';
import PatientsListHeader from '../components/PatientsListHeader';
import Backdrop from '../components/UI/Backdrop';
import classes from './Patients.module.css';
import Modal from '../components/UI/Modal';
import { useState, useEffect } from 'react';

const Patients = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loadedPatients, setLoadedPatients] = useState([]);

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

    function submitPatientHandler(patient) {
       console.log(patient);
       setLoadedPatients(prevPatients=>{
           return [patient,...prevPatients];
       });
       console.log(loadedPatients);
    }

    return (
        <div className={classes.test}>

            <Container>
                <PatientsListHeader />
                <PatientsList patients={loadedPatients} />
                <button onClick={addPatientHandler} className={classes.addButton}>Add Patient +</button>
                {modalIsOpen && <Modal onClose={closeHandler} onSubmit={submitPatientHandler} patients={loadedPatients}/>}
                {modalIsOpen && <Backdrop onClick={closeHandler} />}

            </Container>
        </div>
    );
};

export default Patients;