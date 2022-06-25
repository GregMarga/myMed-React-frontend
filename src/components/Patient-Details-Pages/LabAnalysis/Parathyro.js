import { Fragment } from 'react';
import classes from './Parathyro.module.css';
import Card from '../../UI/Card';
import { Container, Col, Row } from 'react-bootstrap';
import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/http-hook';
import { AuthContext } from '../../../context/auth-context';
import ErrorModal from '../../UI/ErrorModal';
import LoadingSpinner from '../../UI/LoadingSpinner';
import moment from 'moment';
import SaveButton from '../../UI/SaveButton';


const Parathyro = (props) => {
    const [loadParathyro, setLoadParathyro] = useState({ date: '', visitDate: '', pth: '', vitd: '', ca: '', p: '', alvoumini: '', kreatanini: '' });
    const params = useParams();
    const auth = useContext(AuthContext);
    const { error, clearError, isLoading, sendRequest } = useHttpClient();

    const dateInputRef = useRef();
    const visitDateInputRef = useRef();
    const pthInputRef = useRef();
    const vitdInputRef = useRef();
    const caInputRef = useRef();
    const pInputRef = useRef();
    const alvouminiInputRef = useRef();
    const kreataniniInputRef = useRef();


    const fetchVisit = async () => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/lab_tests/parathyro/${params.labId}`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            setLoadParathyro({ date: moment(responseData.date).format('YYYY-MM-DD'), visitDate: moment(responseData.visitDate).format('YYYY-MM-DD'), pth: responseData.pth, vitd: responseData.vitd, ca: responseData.ca, p: responseData.p, alvoumini: responseData.alvoumini, kreatanini: responseData.kreatanini });
        } catch (err) { }

    };
    useEffect(() => {
        if (params.labId !== 'new' && params.type === 'parathyro') {
            fetchVisit()
        }
    }, [props.patientId, auth.token]);

    const submitHandler = async (event) => {
        event.preventDefault();
        if (params.labId === 'new' || loadParathyro.date === '') {
            try {
                await sendRequest(`http://localhost:5000/patients/${props.patientId}/lab_tests`, 'POST',
                    JSON.stringify({
                        type: 'parathyro',
                        date: dateInputRef.current.value,
                        pth: pthInputRef.current.value,
                        vitd: vitdInputRef.current.value,
                        ca: caInputRef.current.value,
                        p: pInputRef.current.value,
                        alvoumini: alvouminiInputRef.current.value,
                        kreatanini: kreataniniInputRef.current.value
                    }), {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                });
            } catch (err) { }
        } else {
            try {
                await sendRequest(`http://localhost:5000/patients/${props.patientId}/lab_tests/${params.labId}`, 'PATCH',
                    JSON.stringify({
                        type: 'parathyro',
                        date: dateInputRef.current.value,
                        pth: pthInputRef.current.value,
                        vitd: vitdInputRef.current.value,
                        ca: caInputRef.current.value,
                        p: pInputRef.current.value,
                        alvoumini: alvouminiInputRef.current.value,
                        kreatanini: kreataniniInputRef.current.value
                    }), {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                });
            } catch (err) { }

        }
    }


    return (
        <Fragment>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner />}
            <Card>
                <form className={classes.thyroForm} onSubmit={submitHandler}>

                    <Container >
                        <Row >
                            <Col className={classes.myCol}>
                                <span>Πεδία</span>
                                <span>Τιμές(mg)</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={classes.myCol}>
                                <label>Ημ/νία</label>
                                <input ref={dateInputRef} name='date' type='date' defaultValue={loadParathyro.date} required />
                            </Col>
                        </Row>

                        <Row >
                            <Col className={classes.myCol}>
                                <label>PTH</label>
                                <input ref={pthInputRef} name='pth' defaultValue={loadParathyro.pth} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>vitD</label>
                                <input ref={vitdInputRef} name='vitd' defaultValue={loadParathyro.vitd} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Ca</label>
                                <input ref={caInputRef} name='ca' defaultValue={loadParathyro.ca} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>P</label>
                                <input ref={pInputRef} name='p' defaultValue={loadParathyro.p} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Αλβουμίνη</label>
                                <input ref={alvouminiInputRef} name='alvoumini' defaultValue={loadParathyro.alvoumini} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Κρεατινίνη</label>
                                <input ref={kreataniniInputRef} name='kreatinini' defaultValue={loadParathyro.kreatanini} />
                            </Col>
                        </Row>
                        <Row><Col><SaveButton /></Col></Row>

                    </Container>
                </form>
            </Card>
        </Fragment>
    );
};

export default Parathyro;