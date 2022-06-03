// import { Container, Row, Col } from "react-bootstrap";
import classes from './PatientForm.module.css';

const PatientForm = (props) => {
    return (
        <div className={classes.form_style_5}>
            <form method='post' action='http://localhost:5000/patients'>
                <fieldset>
                    <legend>Patient Info</legend>
                    <input type="text" name="field1" placeholder="Επώνυμο *" required />
                    <input type="text" name="field2" placeholder="Όνομα *" required />
                    <input type="text" name="field2" placeholder="Πατρώνυμο " />
                    <input type="text" name="field2" placeholder="Ηλικία " />
                    <input type="text" name="field2" placeholder="Τηλέφωνο *" required />
                    <input type="text" name="field2" placeholder="ΑΜΚΑ " />
                    <button className="btn btn--alt" onClick={props.onClose}>Cancel</button>
                    <button className="btn" type='submit'>Add </button>


                </fieldset>

            </form>
        </div>
    );
};

export default PatientForm;