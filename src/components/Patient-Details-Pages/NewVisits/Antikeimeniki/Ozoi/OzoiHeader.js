import { Row, Col } from "react-bootstrap";
import classes from './OzoiHeader.module.css';

const OzoiHeader = () => {
    return (
        <Row className={classes.ozoiHeader}>
            <Col sm={4} md={2} className='text-center'>Όνομα </Col>
            <Col sm={4} md={2} className='text-center'>Μήκος(mm)</Col>
            <Col sm={4} md={2} className='text-center'>Ύψος(mm)</Col>
            <Col sm={4} md={2} className='text-center'>Βάθος(mm)</Col>
            <Col sm={4} md={2} className='text-center'>Ημ/νια Εύρεσης</Col>
            <Col sm={2}></Col>
        </Row>
    );
}

export default OzoiHeader;