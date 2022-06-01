// import { Container, Row, Col } from "react-bootstrap";
import classes from './PatientForm.module.css';

const PatientForm = () => {
    return (
        <div  className={classes.form_style_5}>
        <form>
        <fieldset>
        <legend>Patient Info</legend>
        <input type="text" name="field1" placeholder="Επώνυμο *" required/>
        <input type="text" name="field2" placeholder="Όνομα *" required/>
        <input type="text" name="field2" placeholder="Πατρώνυμο "/>
        <input type="text" name="field2" placeholder="Ηλικία "/>
        <input type="text" name="field2" placeholder="Τηλέφωνο *" required/>
        <input type="text" name="field2" placeholder="ΑΜΚΑ "/>
        
           
        </fieldset>
        
        </form>
        </div>
    );
};

export default PatientForm;