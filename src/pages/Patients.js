import { Container } from 'react-bootstrap';
import PatientsList from '../components/PatientsList';
import PatientsListHeader from '../components/PatientsListHeader';
import Backdrop from '../components/UI/Backdrop';
import classes from './Patients.module.css';
import Modal from '../components/UI/Modal';
import { useState } from 'react';

const Patients = (props) => {
    const[modalIsOpen,setModalIsOpen]=useState(false);
    function addPatientHandler(){
        setModalIsOpen(true);
    }
    function closeHandler(){
        setModalIsOpen(false);
    }
    return (
        <div className={classes.test}>
           
            <Container>
                <PatientsListHeader />
                <PatientsList patients={props.patients} />
                <button onClick={addPatientHandler} className={classes.addButton}>Add Patient +</button>
                {modalIsOpen&&<Modal onClose={closeHandler}/>}
                {modalIsOpen&&<Backdrop onClick={closeHandler}/>}
                
            </Container>
        </div>
    );
};

export default Patients;