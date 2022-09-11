import { Container, Row, Col } from "react-bootstrap"
import Card from "../../../UI/Card";
import classes from './Antikeimeniki.module.css';
import { useContext, useRef, useState, useEffect } from "react";
import SaveButton from '../../../UI/SaveButton';
import EditFormButton from '../../../UI/EditFormButton';
import BMI from "../../Visits/BMI";
import ErrorModal from "../../../UI/ErrorModal";
import LoadingSpinner from "../../../UI/LoadingSpinner";
import moment from "moment";
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";


const Antikeimeniki = () => {
    const [loadVisit, setLoadVisit] = useState({ test_volume: '' });
    const [editAntikemeniki, setEditAntikemeniki] = useState(false)

    const [bmiParams, setBmiParams] = useState({
        weight: 1,
        height: 1
    }
    );
    const auth = useContext(AuthContext)
    const patientContext = useContext(PatientContext);
    const { error, sendRequest, clearError, isLoading } = useHttpClient();


    useEffect(() => {

        const fetchHistory = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/631889e05aa8e7970c0e6155/visits/${patientContext.visitId}`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                console.log(responseData)
                setLoadVisit(responseData);
                setBmiParams({ height: responseData.height, weight: responseData.weight })
                setEditAntikemeniki(true)


            } catch (err) { console.log(err) }

        };

        if (!!patientContext.visitId) {
            fetchHistory();
        }

    }, [patientContext.visitId, sendRequest]);


    const dateInputRef = useRef();
    const aitia_proseleusisInputRef = useRef();
    const geniki_eikonaInputRef = useRef();
    const sfiksisInputRef = useRef();
    const piesiInputRef = useRef();
    const weightInputRef = useRef();
    const heightInputRef = useRef();
    const test_volumeInputRef = useRef();

    const tektInputRef = useRef();
    const smktInputRef = useRef();


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
    const submitHandler = async (event) => {
        event.preventDefault();
        console.log('submit')
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/631889e05aa8e7970c0e6155/visit/antikeimeniki`, 'POST',
                JSON.stringify({
                    date: dateInputRef.current.value,
                    geniki_eikona: geniki_eikonaInputRef.current.value,
                    aitia_proseleusis: aitia_proseleusisInputRef.current.value,
                    piesi: piesiInputRef.current.value,
                    sfiksis: sfiksisInputRef.current.value,
                    weight: weightInputRef.current.value,
                    height: heightInputRef.current.value,
                    smkt: smktInputRef.current.value,
                    tekt: tektInputRef.current.value,
                    // test_volume: test_volumeInputRef.current.value,                  


                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            setEditAntikemeniki(true)
            patientContext.createVisitId(responseData._id)
        } catch (err) { console.log(err) }
    }


    const updateHandler = async (event) => {
        console.log('update')
        event.preventDefault();
        try {
            await sendRequest(`http://localhost:5000/patients/631889e05aa8e7970c0e6155/visits/${patientContext.visitId}/antikeimeniki`, 'PATCH',
                JSON.stringify({
                    date: dateInputRef.current.value,
                    geniki_eikona: geniki_eikonaInputRef.current.value,
                    aitia_proseleusis: aitia_proseleusisInputRef.current.value,


                    piesi: piesiInputRef.current.value,
                    sfiksis: sfiksisInputRef.current.value,
                    weight: weightInputRef.current.value,
                    height: heightInputRef.current.value,
                    smkt: smktInputRef.current.value,
                    tekt: tektInputRef.current.value,
                    // if (patientContext.gender==='male')
                    test_volume: (patientContext.gender === 'male') ? test_volumeInputRef.current.value : null,

                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            setEditAntikemeniki(true)
        } catch (err) { console.log(err) }
    }


    return (
        <Container className={classes.newVisit}>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            {!!isLoading && <LoadingSpinner />}
            <form onSubmit={(!patientContext.visitId) ? submitHandler : updateHandler}>
                <Card className={classes.cardsNewVisit}>

                    <Row>
                        <Col> <span className={classes.subtitle}>Γενικά</span></Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Ημερομηνία*</label>
                            <input ref={dateInputRef} className={classes.date} name='date' type='date' defaultValue={moment(new Date()).format('YYYY-MM-DD')} required disabled={editAntikemeniki} />
                            {/* <input  className={classes.date} name='date' type='date' required /> */}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <label>Γενική εικόνα</label>
                            <input ref={geniki_eikonaInputRef} name='geniki_eikona' defaultValue={loadVisit.geniki_eikona} className={classes.fullSize} disabled={editAntikemeniki} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Αιτία Προσέλευσης</label>
                            <input ref={aitia_proseleusisInputRef} name='geniki_eikona' defaultValue={loadVisit.geniki_eikona} className={classes.fullSize} disabled={editAntikemeniki} />
                        </Col>
                    </Row>
                    <Row>
                        <Col> <span className={classes.subtitle}>Βιομετρικά</span></Col>
                    </Row>
                    <Row className={classes.multiInputs}>
                        <Col><label >Αρτηριακή πίεση</label><input ref={piesiInputRef} name='piesi' defaultValue={loadVisit.piesi} disabled={editAntikemeniki} /></Col>
                        <Col ><label >Σφύξεις</label><input ref={sfiksisInputRef} name='sfiksis' defaultValue={loadVisit.sfiksis} disabled={editAntikemeniki} /></Col>


                    </Row>
                    <Row className={`justify-content-start ${classes.threeInput}`}>
                        <Col lg='3'><label >Βάρος(kg)*</label> <input ref={weightInputRef} minLength={2} maxLength={3} name='weight' disabled={editAntikemeniki} defaultValue={loadVisit.weight} onChange={changeWeightHandler} required /></Col>
                        <Col lg='3'><label >Ύψος(mt)*</label> <input ref={heightInputRef} minLength={4} maxLength={4} name='height' disabled={editAntikemeniki} defaultValue={loadVisit.height} onChange={changeHeightHandler} required /></Col>
                        <Col lg='3' className={classes.readOnly}><BMI height={bmiParams.height} weight={bmiParams.weight} /></Col>

                    </Row>

                    <Row>
                        <Col> <span className={classes.subtitle}>Γεννητικά Όργανα</span></Col>
                    </Row>
                    <Row>
                        <Col>
                            <label>Τριχοφυΐα Εφηβαίου Κατά Tanner</label>
                            <select ref={tektInputRef} name='tekt' disabled={editAntikemeniki}>
                                <option value={0} selected disabled hidden>Select an Option</option>
                                <option value={1} selected={loadVisit.tekt === 1}>1</option>
                                <option value={1} selected={loadVisit.tekt === 1}>2</option>
                                <option value={1} selected={loadVisit.tekt === 1}>3</option>
                                <option value={1} selected={loadVisit.tekt === 1}>4</option>
                                <option value={1} selected={loadVisit.tekt === 1}>5</option>
                            </select>
                        </Col>
                    </Row>
                    {/* {(patientContext.gender === 'female') && <Row> */}
                    <Row>
                        <Col>
                            <label>Στάδιο Μαστών Κατά Tanner</label>
                            <select ref={smktInputRef} name='smkt' disabled={editAntikemeniki}>
                                <option value={0} selected disabled hidden>Select an Option</option>
                                <option value={1} selected={loadVisit.smkt === 1}>1</option>
                                <option value={2} selected={loadVisit.smkt === 2}>2</option>
                                <option value={3} selected={loadVisit.smkt === 3}>3</option>
                                <option value={4} selected={loadVisit.smkt === 4}>4</option>
                                <option value={5} selected={loadVisit.smkt === 5}>5</option>
                            </select>
                        </Col>
                    </Row>
                    {/* </Row>} */}
                    {(true) && <Row>
                        <Col>
                            <label>Τελευταία Έμμηνος Ρύση</label>
                            <input className={classes.date} type='date' disabled={editAntikemeniki} />
                        </Col>
                    </Row>}
                    {(patientContext.gender === 'male') && <Row>
                        <Row>
                            <Col className={classes.threeInput}><label>Όγκος Όρχεων(ml)</label><input ref={test_volumeInputRef} defaultValue={loadVisit.test_volume} name='test_volume' /></Col>
                        </Row>
                    </Row>}
                    <Row>
                        {!editAntikemeniki && <SaveButton />}
                        {editAntikemeniki && <EditFormButton onClick={() => { setEditAntikemeniki(false) }} />}
                    </Row>
                </Card>
            </form>
        </Container>
    );
};

export default Antikeimeniki;