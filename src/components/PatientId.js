import classes from './PatientId.module.css';

const PatientId=(props)=>{
    return (       
        
        <div className={classes.myDiv}>{`Ασθενής: ${props.patient.sirname} ${props.patient.name} - Ηλικία:${props.patient.age} - ΑΜΚΑ:${props.patient.amka}`}</div>
    );
}

export default PatientId;