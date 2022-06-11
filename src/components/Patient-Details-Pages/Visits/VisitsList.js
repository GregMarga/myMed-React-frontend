import classes from './VisitsList.module.css';
import { Container, Row, Col } from "react-bootstrap";
import VisitsListItems from './VisitsListItems';


const VisitsList = (props) => {
    const clickHandler = () => {
        props.clickHandler();
    };

    return (
        <Container fluid className={classes.visitsList}>

            {props.visits.map((visit) => {
                return <VisitsListItems
                    onDelete={props.onDelete}
                    key={visit._id}
                    visitId={visit._id}
                    visitType='Προληπτική'
                    date={visit.date}
                    diagnosis={visit.diagnosis}
                    clickHandler={clickHandler}
                />
            })}
            {(props.visits.length === 0) && <Row>
                <Col className='text-center'>List is empty,add a visit.</Col>
            </Row>}


        </Container>
    );
};

export default VisitsList;