import { Container, Row, Col } from 'react-bootstrap';
import { useRef } from 'react';
import classes from './PatientsListHeader.module.css';

const PatientsListHeader = (props) => {
    const nameInputRef = useRef();
    const sirnameInputRef = useRef();
    const fathersNameInputRef = useRef();
    const ageInputRef = useRef();
    const telInputRef = useRef();
    const amkaInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        props.changeSearchParams(sirnameInputRef.current.value, nameInputRef.current.value, telInputRef.current.value, amkaInputRef.current.value, ageInputRef.current.value, fathersNameInputRef.current.value)
    }

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
            <form onSubmit={submitHandler}>
                <Row className='justify-content-sm-space-around'>

                    <Col className='text-center'><input ref={sirnameInputRef} name='sirname' type='text' id='sirname' /></Col>
                    <Col className='text-center'><input ref={nameInputRef} name='name' type='text' id='name' /></Col>
                    <Col className='text-center'><input ref={fathersNameInputRef} name='fathersName' type='text' id='fathers_name' /></Col>
                    <Col className='text-center'><input ref={ageInputRef} name='age' type='text' id='age' /></Col>
                    <Col className='text-center'><input ref={telInputRef} name='tel' type='text' id='tel' /></Col>
                    <Col className='text-center'><input ref={amkaInputRef} name='amka' type='text' id='amka' /></Col>
                    <Col><button type='submit'>search</button></Col>

                </Row>
            </form>

        </Container>

    );
}

export default PatientsListHeader;