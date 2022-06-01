import ListsHeader from "../../ListsHeader";
import classes from './Visits.module.css';
import { Container } from "react-bootstrap";
import VisitsList from "./VisitsList";
import Card from "../../UI/Card";
import Button from "../../UI/Button";



const Visits = () => {
    function addVisitsHandler(){
        console.log('new');
    }



    return (
        <Container fluid className={classes.visits}>
            <Card className={classes.cardsVisit}>
                <ListsHeader type='Τύπος Επίσκεψης' date='Ημερομηνία' diagnosis='Διάγνωση'/>
                <VisitsList />

            </Card>
            <Button addHandler={addVisitsHandler}/>

        </Container>
    );
};

export default Visits;