import { Row, Col } from "react-bootstrap";
import classes from './FilesHeader.module.css';

const FilesHeader = () => {
    return (
        <Row className={classes.fileHeader}>
            <Col sm={4} md={2} className='text-center'>Αρχείο</Col>
            <Col sm={4} md={2} className='text-center'>Τύπος Εξέτασης</Col>
            <Col sm={4} md={3} className='text-center'>Ημερομηνία Εξέτασης</Col>
            <Col sm={4} md={3} className='text-center'>Ημερομηνία Επίσκεψης</Col>
            <Col sm={2}></Col>
        </Row>
    );
}

export default FilesHeader;