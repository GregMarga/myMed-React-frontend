import { Row, Col } from "react-bootstrap";
import classes from './FarmakaHeader.module.css';

const FarmakaHeader = () => {
    return (
        <Row className={classes.farmakaHeader}>
            <Col sm={4} md={3} className='text-center'>Όνομα Φαρμάκου</Col>
            <Col sm={4} md={3} className='text-center'>Δραστική Ουσία</Col>
            <Col sm={4} md={2} className='text-center'>Ημ/νία Αρχής</Col>
            <Col sm={4} md={2} className='text-center'>Ημ/νία Τέλους</Col>
            <Col sm={2}></Col>
        </Row>
    );
}

export default FarmakaHeader;