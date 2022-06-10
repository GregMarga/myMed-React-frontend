import ListsHeader from "../../ListsHeader";
import classes from './Visits.module.css';
import { Container } from "react-bootstrap";
import VisitsList from "./VisitsList";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import LoadingSpinner from "../../UI/LoadingSpinner";
import {  useEffect, useState } from "react";
import ErrorModal from '../../UI/ErrorModal';
import { useHttpClient } from "../../../hooks/http-hook";



const Visits = (props) => {
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const [loadedVisits, setLoadedVisits] = useState([]);
  
    

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/visits`);
                setLoadedVisits(responseData);
            } catch (err) { }

        };
        fetchHistory();
    }, [sendRequest]);


    function addVisitsHandler() { }

    return (     

            <Container fluid className={classes.visits}>
            {isLoading && <LoadingSpinner asOverlay />}
            {!!error && <ErrorModal error={error} onClear={clearError} />}
                <Card className={classes.cardsVisit}>
                    <ListsHeader type='Τύπος Επίσκεψης' date='Ημερομηνία' diagnosis='Διάγνωση' />
                    {!isLoading && <VisitsList visits={loadedVisits} />}

                </Card>
                <Button addHandler={addVisitsHandler} />
            </Container>

       
    );
};

export default Visits;