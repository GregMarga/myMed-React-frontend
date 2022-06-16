import { Container, Row, Col } from 'react-bootstrap';
import classes from './LabsList.module.css';
import LabsListItem from './LabsListItem';

const LabsList = (props) => {
    return (
        <Container fluid className={classes.LabsList}>
            {props.labs.map((test) => {
                return (<LabsListItem
                    key={test._doc._id}
                    labTestId={test._doc._id}
                    labType={test.type}
                    labDate={test._doc.date}
                    visitDate='25/3/2019'
                    onDelete={props.onDelete}
                />);
            })}
            {(props.labs.length === 0) && <Row><Col className='text-center'>No lab tests recorded for this patient,add one.</Col></Row>}
        </Container>
    );
};

export default LabsList;