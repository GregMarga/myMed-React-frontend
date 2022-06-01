import { Container, Row, Col } from 'react-bootstrap';
import classes from './PatientsListHeader.module.css';

const PatientsListHeader = () => {
    return (
        <Container >
           
                <Row className='justify-content-sm-space-around'>
                    <Col className='text-center'><label className={classes.labels} htmlFor='sirname'>Επώνυμο</label></Col>
                    <Col className='text-center'><label className={classes.labels} htmlFor='name'>Όνομα</label></Col>
                    <Col className='text-center'><label className={classes.labels} htmlFor='fathers_name'>Πατρώνυμο</label></Col>
                    <Col className='text-center'><label className={classes.labels} htmlFor='age'>Ηλικία</label></Col>
                    <Col className='text-center'><label className={classes.labels} htmlFor='tel'>Τηλέφωνο</label></Col>
                    <Col className='text-center'><label className={classes.labels} htmlFor='amka'>ΑΜΚΑ</label></Col>
                    <Col></Col>
                </Row>
           
            <Row className='justify-content-sm-space-around'>
                <Col className='text-center'><input type='text' id='sirname' /></Col>
                <Col className='text-center'><input type='text' id='name' /></Col>
                <Col  className='text-center'><input type='text' id='fathers_name' /></Col>
                <Col  className='text-center'><input type='text' id='age' /></Col>
                <Col  className='text-center'><input type='text' id='tel' /></Col>
                <Col  className='text-center'><input type='text' id='amka' /></Col>
                <Col></Col>
            </Row>

        </Container>
 
    );
}

export default PatientsListHeader;