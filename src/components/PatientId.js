import classes from './PatientId.module.css';

const PatientId=(props)=>{
    return (       
        
        <pre className={classes.myDiv}>{`Ασθενής: ${props.patient.sirname} ${props.patient.name} - Ηλικία:${props.patient.age} - ΑΜΚΑ:${props.patient.amka}`}</pre>
    );
}

export default PatientId;