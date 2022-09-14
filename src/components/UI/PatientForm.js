import { useRef, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import { useContext } from 'react';
import classes from './PatientForm.module.css';
import { useHttpClient } from '../../hooks/http-hook';
import ErrorModal from './ErrorModal';
import moment from 'moment';



const PatientForm = (props) => {
    const auth = useContext(AuthContext);
    const sirnameInputRef = useRef();
    const nameInputRef = useRef();
    const diagnosisInputRef = useRef();
    const dateOfBirthInputRef = useRef();
    const TelInputRef = useRef();
    const amkaInputRef = useRef();

    const [type, setType] = useState('text')

    const { error, clearError, sendRequest } = useHttpClient();

    const onFocus = (event) => {
        setType('date')
    }
    const onBlur = (event) => {
        setType('text')
    }

    async function submitHandler(event) {

        event.preventDefault();
        const enteredPatient = {
            sirname: sirnameInputRef.current.value,
            name: nameInputRef.current.value,
            diagnosis: diagnosisInputRef.current.value,
            dateOfBirth: dateOfBirthInputRef.current.value,
            tel: TelInputRef.current.value,
            amka: amkaInputRef.current.value,
            uid: auth.userId
        }
        const response = await sendRequest('${process.env.REACT_APP_BACKEND_URL}/patients', 'POST', JSON.stringify(enteredPatient), {
            Authorization: 'Bearer ' + auth.token,
            'Content-Type': 'application/json'
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
                    <input ref={diagnosisInputRef} type="text" name="diagnosis" placeholder="Διάγνωση " />
                    <input ref={dateOfBirthInputRef} type={type} onFocus={onFocus} onBlur={onBlur} max={moment(new Date()).format('YYYY-MM-DD')} name="dateOfBirth" placeholder="Ημερομηνία Γέννησης " />
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