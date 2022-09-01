import { Row, Col } from "react-bootstrap";
import classes from './VisitsListHeader.module.css';

const VisitsListHeader = () => {
    return (
        <Row className={classes.farmakaHeader}>
            <Col sm={3} md={3} className='text-center'>Ημερομηνία</Col>
            <Col sm={4} md={4} className='text-center'>Γενική Εικόνα</Col>
            <Col sm={4} md={3} className='text-center'>Αιτία Προσέλευσης</Col>
           
            <Col sm={2}></Col>
        </Row>
    );
}

export default VisitsListHeader;