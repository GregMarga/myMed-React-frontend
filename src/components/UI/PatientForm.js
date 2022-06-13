import { useRef } from 'react';
import { AuthContext } from '../../context/auth-context';
import { useContext } from 'react';
import classes from './PatientForm.module.css';
import { useHttpClient } from '../../hooks/http-hook';
import ErrorModal from './ErrorModal';



const PatientForm = (props) => {
    const auth = useContext(AuthContext);
    const sirnameInputRef = useRef();
    const nameInputRef = useRef();
    const fathersNameInputRef = useRef();
    const AgeInputRef = useRef();
    const TelInputRef = useRef();
    const amkaInputRef = useRef();

    const { error, clearError, sendRequest } = useHttpClient();

    async function submitHandler(event) {
        
        event.preventDefault();
        const enteredPatient = {
            sirname: sirnameInputRef.current.value,
            name: nameInputRef.current.value,
            fathersName: fathersNameInputRef.current.value,
            age: AgeInputRef.current.value,
            tel: TelInputRef.current.value,
            amka: amkaInputRef.current.value,
            uid: auth.userId
        }
        const response = await sendRequest('http://localhost:5000/patients', 'POST', JSON.stringify(enteredPatient), {
            Authorization: 'Bearer ' + auth.token,
            'Content-Type':'application/json'
        });
        
        // history.push('/')
        props.onSubmit(response);
        props.onClick(); //close form

    }
    return (
        <div className={classes.form_style_5}>
             {!!error && <ErrorModal error={error} onClear={clearError} />}
            <form onSubmit={submitHandler}>
                <fieldset>
                    <legend>Patient Info</legend>
                    <input ref={sirnameInputRef} type="text" name="sirname" placeholder="Επώνυμο *" required />
                    <input ref={nameInputRef} type="text" name="name" placeholder="Όνομα *" required />
                    <input ref={fathersNameInputRef} type="text" name="fathersName" placeholder="Πατρώνυμο " />
                    <input ref={AgeInputRef} type="text" name="age" placeholder="Ηλικία " />
                    <input ref={TelInputRef} type="text" name="tel" placeholder="Τηλέφωνο *" required />
                    <input ref={amkaInputRef} type="text" name="amka" placeholder="ΑΜΚΑ " />
                    <button className="btn btn--alt" type="button" onClick={props.onClick}>Cancel</button>
                    <button className="btn" type='submit'>Add </button>


                </fieldset>

            </form>
        </div>
    );
};

export default PatientForm;