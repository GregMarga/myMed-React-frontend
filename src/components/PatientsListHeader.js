import { Container, Row, Col } from 'react-bootstrap';
import classes from './PatientsListHeader.module.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const PatientsListHeader = (props) => {
    const [name,setName]=useState();
    const [sirname,setSirname]=useState();
    const [diagnosis,setDiagnosis]=useState();
    const [tel,setTel]=useState();
    const [amka,setAmka]=useState();
    const history = useHistory()
    function changeNameHandler(event) {
        props.dispatch({ type: 'name', payload: { name: event.target.value } })
        setName(event.target.value);
    }
    function changeSirnameHandler(event) {
        props.dispatch({ type: 'sirname', payload: { sirname: event.target.value } })
        setSirname(event.target.value);
    }
    function changeDiagnosisHandler(event) {
        props.dispatch({ type: 'diagnosis', payload: { diagnosis: event.target.value } })
        setDiagnosis(event.target.value);
    }
    function changeTelHandler(event) {
        props.dispatch({ type: 'tel', payload: { tel: event.target.value } })
        setTel(event.target.value);
    }
    function changeAmkaHandler(event) {
        props.dispatch({ type: 'amka', payload: { amka: event.target.value } })
        setAmka(event.target.value);
    }
    function clearHandler(event) {
        props.dispatch({type:'clear'});
        setName('');
        setSirname('');
        setDiagnosis('');
        setTel('');
        setAmka('');
        // history.push(`/patients/62aa19495a6877632fd7d9e8/lab_test?q=2022-06-16`)

    }

    return (
        <Container >
            <Row><Col className='text-center'><h4 className={classes.title}>Ασθενείς</h4></Col></Row>
            <Row className='justify-content-sm-space-around'>
                <Col className='text-center'><label className={classes.labels} htmlFor='sirname'>Επώνυμο</label></Col>
                <Col className='text-center'><label className={classes.labels} htmlFor='name'>Όνομα</label></Col>
                <Col className='text-center'><label className={classes.labels} htmlFor='diagnosis'>Πατρώνυμο</label></Col>
                <Col className='text-center'><label className={classes.labels} htmlFor='age'>Ηλικία</label></Col>
                <Col className='text-center'><label className={classes.labels} htmlFor='tel'>Τηλέφωνο</label></Col>
                <Col className='text-center'><label className={classes.labels} htmlFor='amka'>ΑΜΚΑ</label></Col>
                <Col></Col>
            </Row>
            {/* <form>
                <Row className='justify-content-sm-space-around'>

                    <Col className='text-center'><input onChange={changeSirnameHandler} value={sirname} name='sirname' type='text' id='sirname' /></Col>
                    <Col className='text-center'><input onChange={changeNameHandler} value={name} name='name' type='text' id='name' /></Col>
                    <Col className='text-center'><input onChange={changeDiagnosisHandler} value={diagnosis} name='diagnosis' type='text' id='diagnosis' /></Col>
                    <Col className='text-center'><input name='age' type='text' id='age' /></Col>
                    <Col className='text-center'><input onChange={changeTelHandler} value={tel} name='tel' type='text' id='tel' /></Col>
                    <Col className='text-center'><input onChange={changeAmkaHandler} value={amka} name='amka' type='text' id='amka' /></Col>
                    <Col><button type='button' className={classes.button} onClick={clearHandler}>Clear filters</button></Col>

                </Row>
            </form> */}

        </Container>

    );
}

export default PatientsListHeader;