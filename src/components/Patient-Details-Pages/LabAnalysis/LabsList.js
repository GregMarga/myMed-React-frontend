import { Container } from 'react-bootstrap';
import classes from './LabsList.module.css';
import LabsListItem from './LabsListItem';

const LabsList=()=>{
    return (
        <Container fluid className={classes.LabsList}>
            <LabsListItem labTestId='lt1' labType='Γενική Αίματος' labDate='19/3/2019' visitDate='25/3/2019'/>
            <LabsListItem labTestId='lt2' labType='Υπόφυση' labDate='19/3/2019' visitDate='25/3/2019'/>

        </Container>
    );
};

export default LabsList;