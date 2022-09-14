import { useState, useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import classes from './EditPatient.module.css';
import { AuthContext } from '../context/auth-context';
import ErrorModal from './UI/ErrorModal';
import { useHttpClient } from '../hooks/http-hook';
import moment from "moment";



const EditPatient = (props) => {

    const [loadedPatient, setLoadedPatient] = useState({ sirname: "", name: "", fathersName: "", dateOfBirth: "", tel: "", amka: "" });
    const sirnameInputRef = useRef();
    const nameInputRef = useRef();
    const diagnosisInputRef = useRef();
    const dateOfBirthInputRef = useRef();
    const TelInputRef = useRef();
    const amkaInputRef = useRef();
    const history = useHistory();

    const { error, clearError, sendRequest } = useHttpClient();

    const auth = useContext(AuthContext);

    const [type, setType] = useState('text');

    const onFocus = (event) => {
        setType('date')
    }
    const onBlur = (event) => {
        setType('text')
    }


    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${props.patientId}`, 'GET', null, {
                    Authorization: 'Bearer ' + auth.token
                });
                setLoadedPatient({ sirname: data.sirname, name: data.name, diagnosis: data.diagnosis, dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD'), tel: data.tel, amka: data.amka })

            } catch (err) { }

        };
        fetchPatients();
    }, [sendRequest]);
    console.log((loadedPatient.dateOfBirth === 'Invalid date'))




    async function submitHandler(event) {
        event.preventDefault();
        const updatedPatient = {
            sirname: sirnameInputRef.current.value,
            name: nameInputRef.current.value,
            diagnosis: diagnosisInputRef.current.value,
            dateOfBirth: dateOfBirthInputRef.current.value,
            tel: TelInputRef.current.value,
            amka: amkaInputRef.current.value
        };
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${props.patientId}`, 'PATCH', JSON.stringify(updatedPatient),
            {
                Authorization: 'Bearer ' + auth.token,
                'Content-Type': 'application/json'
            })
        history.push('/');
    }

    return (
        <div className="my_modal">
            <div className={classes.form_style_5}>
                <form onSubmit={submitHandler}>
                    <fieldset>
                        {!!error && <ErrorModal error={error} onClose={clearError} />}
                        <legend>Patient Info</legend>
                        <input ref={sirnameInputRef} type="text" name="sirname" placeholder="Επώνυμο *" defaultValue={loadedPatient.sirname} required />
                        <input ref={nameInputRef} type="text" name="name" placeholder="Όνομα *" defaultValue={loadedPatient.name} required />
                        <input ref={diagnosisInputRef} type="text" name="diagnosis" placeholder="Διάγνωση " defaultValue={loadedPatient.diagnosis} />
                        <input ref={dateOfBirthInputRef} type={type} max={moment(new Date()).format('YYYY-MM-DD')} onBlur={onBlur} onFocus={onFocus} name="dateOfBirth" defaultValue={(loadedPatient.dateOfBirth !== 'Invalid date') ? loadedPatient.dateOfBirth : 'Ημερομηνία Γέννησης'} />
                        <input ref={TelInputRef} type="text" name="tel" placeholder="Τηλέφωνο *" defaultValue={loadedPatient.tel} required />
                        <input ref={amkaInputRef} type="text" name="amka" placeholder="ΑΜΚΑ " defaultValue={loadedPatient.amka} />
                        <button className="btn btn--alt" type="button" onClick={props.onClose}>Cancel</button>
                        <button className="btn" type='submit'>Edit </button>


                    </fieldset>

                </form>
            </div>
        </div>
    );
};

export default EditPatient;