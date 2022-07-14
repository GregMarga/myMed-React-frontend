import classes from './GeneralBlood.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Fragment } from 'react';
import Card from '../../UI/Card';
import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/http-hook';
import { AuthContext } from '../../../context/auth-context';
import ErrorModal from '../../UI/ErrorModal';
import LoadingSpinner from '../../UI/LoadingSpinner';
import moment from 'moment';
import SaveButton from '../../UI/SaveButton';

const GeneralBlood = (props) => {
    const [loadBlood, setLoadBlood] = useState({ date: '', visitDate: '', kallio: '', natrio: '', asbestio: '', ht: '', mcv: '', sgot: '', b12: '', hb: '', visitId: '' });
    const params = useParams();
    const auth = useContext(AuthContext);
    const { error, clearError, isLoading, sendRequest } = useHttpClient();

    const dateInputRef = useRef();
    const kallioInputRef = useRef();
    const natrioInputRef = useRef();
    const asbestioInputRef = useRef();
    const htInputRef = useRef();
    const mcvInputRef = useRef();
    const sgotInputRef = useRef();
    const b12InputRef = useRef();
    const hbInputRef = useRef();

    const fetchVisit = async () => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/lab_tests/blood/${params.labId}`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            props.setLoadVisitId(responseData.visitId)
            setLoadBlood({ date: moment(responseData.date).format('YYYY-MM-DD'), visitDate: moment(responseData.visitDate).format('YYYY-MM-DD'), kallio: responseData.kallio, natrio: responseData.natrio, asbestio: responseData.asbestio, ht: responseData.ht, mcv: responseData.mcv, sgot: responseData.sgot, b12: responseData.b12, hb: responseData.hb, visitId: responseData.visitId });
        } catch (err) { console.log(err) }

    };
    useEffect(() => {
        if (params.labId !== 'new' && params.type === 'blood') {
            fetchVisit()
        }
    }, [props.patientId, auth.token]);

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(dateInputRef.current.value)
        if (params.labId === 'new' || loadBlood.date === '') {   //neo document giati date required ara den yparxei eggrafi gia ayto to typo eksetasis
            try {
                await sendRequest(`http://localhost:5000/patients/${props.patientId}/lab_tests`, 'POST',
                    JSON.stringify({
                        type: 'blood',
                        date: dateInputRef.current.value,
                        visitId: props.visitId,
                        kallio: kallioInputRef.current.value,
                        natrio: natrioInputRef.current.value,
                        asbestio: asbestioInputRef.current.value,
                        ht: htInputRef.current.value,
                        mcv: mcvInputRef.current.value,
                        sgot: sgotInputRef.current.value,
                        b12: b12InputRef.current.value,
                        hb: hbInputRef.current.value
                    }), {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                });
            } catch (err) { }
        }
        else {
            try {

                await sendRequest(`http://localhost:5000/patients/${props.patientId}/lab_tests/${params.labId}`, 'PATCH',
                    JSON.stringify({
                        type: 'blood',
                        date: dateInputRef.current.value,
                        kallio: kallioInputRef.current.value,
                        natrio: natrioInputRef.current.value,
                        asbestio: asbestioInputRef.current.value,
                        ht: htInputRef.current.value,
                        mcv: mcvInputRef.current.value,
                        sgot: sgotInputRef.current.value,
                        b12: b12InputRef.current.value,
                        hb: hbInputRef.current.value
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
            {!isLoading && <Card>
                <form className={classes.bloodForm} onSubmit={submitHandler}>
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
                                <input ref={dateInputRef} name='date' type='date' required defaultValue={loadBlood.date} />
                            </Col>
                        </Row>

                        <Row >
                            <Col className={classes.myCol}>
                                <label>Κάλλιο</label>
                                <input type='number' name='kallio' ref={kallioInputRef} defaultValue={loadBlood.kallio} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Νάτριο</label>
                                <input type='number' name='natrio' ref={natrioInputRef} defaultValue={loadBlood.natrio} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Ασβέστιο</label>
                                <input type='number' name='asbestio' ref={asbestioInputRef} defaultValue={loadBlood.asbestio} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Ht</label>
                                <input type='number' name='ht' ref={htInputRef} defaultValue={loadBlood.ht} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>MCV</label>
                                <input type='number' name='mcv' ref={mcvInputRef} defaultValue={loadBlood.mcv} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>SGOT</label>
                                <input type='number' name='sgot' ref={sgotInputRef} defaultValue={loadBlood.sgot} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>B12</label>
                                <input type='number' name='b12' ref={b12InputRef} defaultValue={loadBlood.b12} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Hb</label>
                                <input type='number' name='hb' ref={hbInputRef} defaultValue={loadBlood.hb} />
                            </Col>
                        </Row>
                        <Row><Col><SaveButton /></Col></Row>

                    </Container>
                </form>
            </Card>}

        </Fragment>

    );
};

export default GeneralBlood;