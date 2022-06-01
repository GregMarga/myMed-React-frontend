import { Container, Col, Row } from "react-bootstrap";
import classes from './History.module.css';

const History = () => {
    return (
        <form className={classes.history}>
            <Container >
                <Row className='justify-content-center '>
                    <Col className='text-sm-end '>
                        <label htmlFor="allergies">Αλλεργίες</label>
                    </Col>
                    <Col className='text-sm-start'>
                        <textarea id='allergies' rows='3' />
                    </Col>
                    <Col className='text-sm-end '>
                        <label htmlFor="klironomiko">Κληρονομικό</label>
                    </Col>
                    <Col className='text-start'>
                        <textarea id='klironomiko' rows='3' />
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className='text-sm-end '>
                        <label htmlFor="fathers-name">Ατομικό</label>
                    </Col>
                    <Col className='text-start'>
                        <textarea id='fathers-name' rows='3' />
                    </Col>
                    <Col className='text-sm-end '>
                        <label htmlFor="surgeries">Εγχειρήσεις-Τοκετοί</label>
                    </Col>
                    <Col className='text-start'>
                        <textarea id='surgeries' rows='3' />
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className='text-sm-end '>
                        <label htmlFor="drugs_use">Χρόνια Χρήση Φαρμάκων</label>
                    </Col>
                    <Col className='text-start'>
                        <textarea id='drugs_use' rows='3' />
                    </Col>
                    <Col className='text-sm-end '>
                        <label htmlFor='smoking-alcohol'>Κάπνισμα-Άλκοολ</label>
                    </Col>
                    <Col className='text-start'>
                        <textarea id='smoking-alcohol' rows='3' />
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col className='text-sm-end '>
                        <label htmlFor="others">Άλλα</label>
                    </Col>
                    <Col className='text-start'>
                        <textarea id='others' rows='4' />
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>



            </Container>
        </form>
    );
}

export default History;