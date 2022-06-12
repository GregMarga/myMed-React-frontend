import { useState, useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import classes from './EditPatient.module.css';
import { AuthContext } from '../context/auth-context';
import ErrorModal from './UI/ErrorModal';
import { useHttpClient } from '../hooks/http-hook';



const EditPatient = (props) => {
    const [loadedPatient, setLoadedPatient] = useState({ sirname: "", name: "", fathersName: "", age: "", tel: "", amka: "" });
    const sirnameInputRef = useRef();
    const nameInputRef = useRef();
    const fathersNameInputRef = useRef();
    const AgeInputRef = useRef();
    const TelInputRef = useRef();
    const amkaInputRef = useRef();
    const history = useHistory();

    const { error, clearError, sendRequest } = useHttpClient();

    const auth = useContext(AuthContext);


    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await sendRequest(`http://localhost:5000/patients/${props.patientId}`, 'GET', null, {
                    Authorization: 'Bearer ' + auth.token
                });
                setLoadedPatient({ sirname: data.sirname, name: data.name, fathersName: data.fathersName, age: data.age, tel: data.tel, amka: data.amka })
            } catch (err) { }

        };
        fetchPatients();
    }, [sendRequest]);



    // fetch(`http://localhost:5000/patients/${props.patientId}`
    // ).then((response) => {
    //     return response.json()
    // })
    //     .then((data) => {
    //         setLoadedPatient({ sirname: data.sirname, name: data.name, fathersName: data.fathersName, age: data.age, tel: data.tel, amka: data.amka });
    //     })
    //     .catch((err) => {
    //         console.log(err.message);
    //     });

    async function submitHandler(event) {
        event.preventDefault();
        const updatedPatient = {
            sirname: sirnameInputRef.current.value,
            name: nameInputRef.current.value,
            fathersName: fathersNameInputRef.current.value,
            age: AgeInputRef.current.value,
            tel: TelInputRef.current.value,
            amka: amkaInputRef.current.value
        };
        const response = await sendRequest(`http://localhost:5000/patients/${props.patientId}`, 'PATCH', JSON.stringify(updatedPatient),
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
                        <input ref={fathersNameInputRef} type="text" name="fathersName" placeholder="Πατρώνυμο " defaultValue={loadedPatient.fathersName} />
                        <input ref={AgeInputRef} type="text" name="age" placeholder="Ηλικία " defaultValue={loadedPatient.age} />
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