import classes from './VisitDetail.module.css';
import Card from "../../UI/Card";
import { Container, Row, Col } from 'react-bootstrap';
import BMI from './BMI';
import SaveButton from '../../UI/SaveButton';
import moment from 'moment';
import { useState, useRef, useContext, useEffect } from 'react';
import { useHttpClient } from '../../../hooks/http-hook';
import { AuthContext } from '../../../context/auth-context';
import { useParams, useHistory } from 'react-router-dom';
import ErrorModal from '../../UI/ErrorModal';
import { Fragment } from 'react';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { Link, useLocation } from "react-router-dom";




const VisitDetail = (props) => {
    // const [loadVisit,setLoadVisit]=useState({date:'',diagnosis:'',geniki_eikona,piesi,sfiksis,weight,height,test_volume,others})
    const params = useParams();
    const auth = useContext(AuthContext);
    const location = useLocation();
    const path = (params.visitId !== 'new') ? location.pathname.split('/visits')[0] + '/lab_test' : location.pathname.split('/visits')[0] + '/lab_test/new';
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const [loadVisit, setLoadVisit] = useState({ date: '', diagnosis: '', geniki_eikona: '', piesi: '', sfiksis: '', weight: '', height: '', test_volume: '', others: '', smkt: '', tekt: '' });
    const [bmiParams, setBmiParams] = useState({
        weight: 1,
        height: 1
    }
    );

    const dateInputRef = useRef();
    const diagnosisInputRef = useRef();
    const geniki_eikonaInputRef = useRef();
    const sfiksisInputRef = useRef();
    const piesiInputRef = useRef();
    const weightInputRef = useRef();
    const heightInputRef = useRef();
    const test_volumeInputRef = useRef();
    const othersInputRef = useRef();
    const tektInputRef = useRef();
    const smktInputRef = useRef();

    useEffect(() => {
        const createVisitId = async () => {
            const visitId = await sendRequest(`http://localhost:5000/patients/visits/createVisitId`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            setLoadVisit({ ...loadVisit, visitId: visitId })
        }
        createVisitId();
    }, []);

    const fetchVisit = async () => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/visits/${params.visitId}`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            console.log(responseData._id)
            setLoadVisit({ diagnosis: responseData.diagnosis, date: moment(responseData.date).format('YYYY-MM-DD'), tekt: responseData.tekt, smkt: responseData.smkt, geniki_eikona: responseData.geniki_eikona, piesi: responseData.piesi, sfiksis: responseData.sfiksis, weight: responseData.weight, height: responseData.height, test_volume: responseData.test_volume, others: responseData.others, visitId: responseData._id });
        } catch (err) { }
        console.log(loadVisit.visitId)

    };

    useEffect(() => {
        if (params.visitId !== 'new') {
            fetchVisit();
        }
    }, []);

    function changeHeightHandler(event) {
        setBmiParams({
            ...bmiParams,
            height: event.target.value
        });
    }
    function changeWeightHandler(event) {
        setBmiParams({
            ...bmiParams,
            weight: event.target.value
        });
    }
    async function submitHandler(event) {
        event.preventDefault();
        if (params.visitId === 'new') {
            console.log(loadVisit.visitId)
            try {
                await sendRequest(`http://localhost:5000/patients/${props.patientId}/visits`, 'POST',
                    JSON.stringify({
                        id: loadVisit.visitId,
                        date: dateInputRef.current.value,
                        diagnosis: diagnosisInputRef.current.value,
                        piesi: piesiInputRef.current.value,
                        sfiksis: sfiksisInputRef.current.value,
                        weight: weightInputRef.current.value,
                        height: heightInputRef.current.value,
                        smkt: smktInputRef.current.value,
                        tekt: tektInputRef.current.value,
                        test_volume: test_volumeInputRef.current.value,
                        others: othersInputRef.current.value,
                        uid: auth.userId
                    }), {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                });
            } catch (err) { }
        } else {
            try {
                await sendRequest(`http://localhost:5000/patients/${props.patientId}/visits/${params.visitId}`, 'PATCH',
                    JSON.stringify({
                        date: dateInputRef.current.value,
                        diagnosis: diagnosisInputRef.current.value,
                        piesi: piesiInputRef.current.value,
                        sfiksis: sfiksisInputRef.current.value,
                        weight: weightInputRef.current.value,
                        height: heightInputRef.current.value,
                        smkt: smktInputRef.current.value,
                        tekt: tektInputRef.current.value,
                        test_volume: test_volumeInputRef.current.value,
                        others: othersInputRef.current.value,
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
            {isLoading && <LoadingSpinner asOverlay />}

            <Container fluid className={classes.visitDetail}>
                <Card className={classes.cardsNewVisit}>
                    <form onSubmit={submitHandler}>
                        <Row className={` justify-content-md-start`}>
                            <Col className={classes.label} lg='2'><h5>Στοιχεία Επίσκεψης</h5></Col>

                            <Col className={classes.label} lg='2'><h5><Link to={`${path}?visitId=${loadVisit.visitId}`}>Εργαστηριακές</Link></h5></Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>Διάγνωση</label>
                                <input ref={diagnosisInputRef} name='diagnosis' defaultValue={loadVisit.diagnosis} className={classes.fullSize} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>Ημερομηνία*</label>
                                <input ref={dateInputRef} className={classes.date} name='date' type='date' defaultValue={loadVisit.date} required />
                                {/* <input  className={classes.date} name='date' type='date' required /> */}
                            </Col>
                        </Row>


                        <Row className="justify-content-center"><Col md='10' className='text-center'><h4>Αντικειμενική Εξέταση</h4></Col></Row>

                        <Row>
                            <Col>
                                <label>Γενική εικόνα</label>
                                <input ref={geniki_eikonaInputRef} name='geniki_eikona' defaultValue={loadVisit.geniki_eikona} className={classes.fullSize} />
                            </Col>
                        </Row>
                        <Row className={classes.multiInputs}>
                            <Col><label >Αρτηριακή πίεση</label><input ref={piesiInputRef} name='piesi' defaultValue={loadVisit.piesi} /></Col>
                            <Col ><label >Σφύξεις</label><input ref={sfiksisInputRef} name='sfiksis' defaultValue={loadVisit.sfiksis} /></Col>


                        </Row>
                        <Row className={`justify-content-start ${classes.threeInput}`}>
                            <Col lg='3'><label >Βάρος</label> <input ref={weightInputRef} name='weight' defaultValue={loadVisit.weight} onChange={changeWeightHandler} /></Col>
                            <Col lg='3'><label >Ύψος</label> <input ref={heightInputRef} name='height' defaultValue={loadVisit.height} onChange={changeHeightHandler} /></Col>
                            <Col lg='3' className={classes.readOnly}><BMI height={bmiParams.height} weight={bmiParams.weight} /></Col>

                        </Row>

                        <Row>
                            <Col> <span className={classes.subtitle}>Γεννετικά Όργανα</span></Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>Τριχοφυΐα Εφηβαίου Κατά Tanner</label>
                                <select ref={tektInputRef} name='tekt'>
                                    <option value={0} selected disabled hidden>Select an Option</option>
                                    <option value={1} selected={loadVisit.tekt === 1}>1</option>
                                    <option value={1} selected={loadVisit.tekt === 1}>2</option>
                                    <option value={1} selected={loadVisit.tekt === 1}>3</option>
                                    <option value={1} selected={loadVisit.tekt === 1}>4</option>
                                    <option value={1} selected={loadVisit.tekt === 1}>5</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>Στάδιο Μαστών Κατά Tanner</label>
                                <select ref={smktInputRef} name='smkt'>
                                    <option value={0} selected disabled hidden>Select an Option</option>
                                    <option value={1} selected={loadVisit.smkt === 1}>1</option>
                                    <option value={2} selected={loadVisit.smkt === 2}>2</option>
                                    <option value={3} selected={loadVisit.smkt === 3}>3</option>
                                    <option value={4} selected={loadVisit.smkt === 4}>4</option>
                                    <option value={5} selected={loadVisit.smkt === 5}>5</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={classes.threeInput}><label>Όγκος Όρχεων(ml)</label><input ref={test_volumeInputRef} defaultValue={loadVisit.test_volume} name='test_volume' /></Col>
                        </Row>
                        <Row>

                        </Row>
                        <Row className="justify-content-center"><Col md='10' className='text-center'><h2> </h2></Col></Row>
                        <Row >
                            <Col sm='1' className='text-md-end'>
                                <label htmlFor="others">Άλλα</label>
                            </Col>
                            <Col sm='6'>
                                <textarea ref={othersInputRef} id='others' defaultValue={loadVisit.others} name='others' rows='3' />
                            </Col>
                        </Row>
                        <Row>
                            <Col><SaveButton /></Col>
                        </Row>
                    </form>
                </Card>
            </Container>
        </Fragment>
    );
};

export default VisitDetail;