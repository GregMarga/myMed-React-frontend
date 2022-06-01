import { Container } from 'react-bootstrap';
import classes from './LabAnalysis.module.css';
import ListsHeader from '../../ListsHeader';
import LabsList from './LabsList';
import Card from "../../UI/Card";
import Button from '../../UI/Button';
import NewLabAnalysis from './NewLabAnalysis';
import { useState } from 'react';

const LabAnalysis = () => {
    const [newVisitIsOpen,setNewVisitIsOpen]=useState(false);

    function addLabTestHandler(){
        setNewVisitIsOpen(true);
    }
    function goBacktoVisits(){
        setNewVisitIsOpen(false);
    }
    if(newVisitIsOpen){
        return <NewLabAnalysis onBack={goBacktoVisits}/>
    }
    return (
        <Container fluid className={classes.labAnalysis}>
            <Card className={classes.cardLab}>
                <ListsHeader type='Τύπος Εξέτασης' date='Ημερομηνία Εξέτασης' diagnosis='Ημερομηνία Επίσκεψης' />
                <LabsList/>
            </Card>
            <Button addHandler={addLabTestHandler}/>
            
        </Container>
    );
};

export default LabAnalysis;