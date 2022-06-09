import { useLocation, Switch, Route } from 'react-router-dom'
import ListsHeader from "../../ListsHeader";
import classes from './Visits.module.css';
import { Container } from "react-bootstrap";
import VisitsList from "./VisitsList";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { Fragment, useEffect, useState } from "react";
import VisitDetail from './VisitDetail';
import { useHttpClient } from "../../../hooks/http-hook";



const Visits = (props) => {
    const { isLoading, sendRequest } = useHttpClient();
    const [loadedVisits, setLoadedVisits] = useState([]);
    const location = useLocation();
    console.log(`${location.pathname}/:visitId`)

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/visits`);
                console.log(responseData);
                setLoadedVisits(responseData);
            } catch (err) { }

        };
        fetchHistory();
    }, []);


    function addVisitsHandler() {
        

    }





    return (
        <Fragment>

            {isLoading && <LoadingSpinner asOverlay />}


            <Switch>
                <Route path={'/patients/62a0e2f4086903904ac8683e/visits/new'}><VisitDetail /></Route>
                <Route paht={'/patients/62a0e2f4086903904ac8683e/visits'} exact>
                    <Container fluid className={classes.visits}>
                        <Card className={classes.cardsVisit}>
                            <ListsHeader type='Τύπος Επίσκεψης' date='Ημερομηνία' diagnosis='Διάγνωση' />
                            <VisitsList visits={loadedVisits} />

                        </Card>
                        <Button addHandler={addVisitsHandler} />
                    </Container>

                </Route>
            </Switch>
        </Fragment>
    );
};

export default Visits;