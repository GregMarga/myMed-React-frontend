import { Row, Col } from "react-bootstrap";
import classes from './FilesHeader.module.css';

const FilesHeader = () => {
    return (
        <Row className={classes.fileHeader}>
            <Col sm={4} md={4} className='text-center'>Αρχείο</Col>
            <Col sm={4} md={2} className='text-center'>Τύπος Εξέτασης</Col>
            <Col sm={4} md={2} className='text-center'>Ημ/νία Εξέτασης</Col>
            <Col sm={4} md={2} className='text-center'>Ημ/νία Επίσκεψης</Col>
            <Col sm={2}></Col>
        </Row>
    );
}

export default FilesHeader;