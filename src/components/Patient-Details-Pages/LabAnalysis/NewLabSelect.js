import classes from './NewLabSelect.module.css';

import { Fragment } from "react";
import { AuthContext } from "../../../context/auth-context";
import { useHttpClient } from "../../../hooks/http-hook";
import { useState, useContext, useEffect } from "react";
import moment from 'moment';
import ErrorModal from "../../UI/ErrorModal";
import LoadingSpinner from "../../UI/LoadingSpinner";



const NewLabSelect = (props) => {
    const [loadVisits, setLoadVisits] = useState([]);
    const { isLoading, error, clearError, sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchVisitDates = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/visits.dates`, 'GET', null, {
                    Authorization: 'Bearer ' + auth.token
                });
                setLoadVisits(responseData);
            } catch (err) { }

        };
        fetchVisitDates();
    }, [sendRequest]);

    function changeHandler(event){
        props.changeHandler(event.target.value);
    }

    return (
        <Fragment>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <label htmlFor="visit" className={classes.label}>Επίσκεψη</label>
            <select id='visit' name='visitDate' className={classes.select} onChange={changeHandler}>
                <option value={0} selected disabled hidden>Select an Option</option>
                {loadVisits.length === 0 && <option disabled>No visits</option>}
                {loadVisits.map((date) => {
                    return (<option value={date._id} key={date._id}>{moment(date.date).format('DD/MM/YYYY')}</option>);
                })}
            </select>
        </Fragment>);
}
export default NewLabSelect;