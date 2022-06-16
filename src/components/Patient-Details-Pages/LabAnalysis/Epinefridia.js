import { Fragment } from 'react';
import classes from './Epinefridia.module.css';
import Card from '../../UI/Card';
import { Container,Col,Row } from 'react-bootstrap';

import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../../hooks/http-hook';
import { AuthContext } from '../../../context/auth-context';
import ErrorModal from '../../UI/ErrorModal';
import LoadingSpinner from '../../UI/LoadingSpinner';
import moment from 'moment';


const Epinefridia = () => {
    const [loadBlood, setLoadBlood] = useState({ date: '', visitDate: '', kallio: '', natrio: '', asbestio: '', ht: '', mcv: '', sgot: '', b12: '', hb: '' });
    const params = useParams();
    const auth = useContext(AuthContext);
    const { error, clearError, isLoading, sendRequest } = useHttpClient();

    // const InputRef=useRef();
    // const InputRef=useRef();
    // const InputRef=useRef();
    // const InputRef=useRef();
    // const InputRef=useRef();
    // const InputRef=useRef();
    // const InputRef=useRef();
    // const InputRef=useRef();
    // const InputRef=useRef();
    // const InputRef=useRef();

    const fetchVisit = async () => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/visits/${params.labId}`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            setLoadBlood({ date: moment(responseData.date).format('YYYY-MM-DD'), visitDate: moment(responseData.visitDate).format('YYYY-MM-DD'), kallio: responseData.kallio, natrio: responseData.natrio, asbestio: responseData.asbestio, ht: responseData.ht, mcv: responseData.mcv, sgot: responseData.sgot, b12: responseData.b12, hb: responseData.hb});
        } catch (err) { }

    };
    useEffect(() => {
        if (params.labId !== 'new') {
            fetchVisit()
        }
    }, []);
    return (
        <Fragment>
            <Card>
                <form className={classes.thyroForm}>

                    <Container >
                        <Row >
                            <Col className={classes.myCol}>
                                <span>Πεδία</span>
                                <span>Τιμές(mg)</span>
                            </Col>
                        </Row>

                        <Row >
                            <Col className={classes.myCol}>
                                <label>TSH</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>T4</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>FT4</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>T3</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>FT3</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>AbTPO</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>TRab</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>CT</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Tg</label>
                                <input />
                            </Col>
                        </Row>

                    </Container>
                </form>
            </Card>
        </Fragment>
    );
};

export default Epinefridia;