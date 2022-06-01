import classes from './PatientId.module.css';

const PatientId=(props)=>{
    const patient=props.patients.filter(patient=>patient.id===props.id)[0];
    
    return (
        
        
        <pre className={classes.myDiv}>{`Ασθενής: ${patient.sirname} ${patient.name} - Ηλικία:${patient.age} - ΑΜΚΑ:${patient.amka}`}</pre>
    );
}

export default PatientId;