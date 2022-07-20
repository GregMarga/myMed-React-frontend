import classes from './PatientId.module.css';
import { useEffect, useState } from 'react';

const PatientId = (props) => {
    const [age, setAge] = useState('')
    useEffect(() => {
        let getAge = (dateOfBirth) => {
            const today = new Date();
            const birthDate = new Date(dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
        let age = (props.patient.dateOfBirth !== null) ? getAge(props.patient.dateOfBirth) : '';
        setAge(age)
    }, [props.patient.dateOfBirth]);
    return (

        <div className={classes.myDiv}>{`Ασθενής: ${props.patient.sirname} ${props.patient.name} - Ηλικία:${age} - ΑΜΚΑ:${props.patient.amka}`}</div>
    );
}

export default PatientId;