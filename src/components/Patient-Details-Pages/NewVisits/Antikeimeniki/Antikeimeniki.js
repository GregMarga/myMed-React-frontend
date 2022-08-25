import { Container, Row, Col } from "react-bootstrap"
import Card from "../../../UI/Card";
import classes from './Antikeimeniki.module.css';
import { useContext, useRef, useState } from "react";
// import SaveButton from '../../UI/SaveButton'
import BMI from "../../Visits/BMI";
import moment from "moment";
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";


const Antikeimeniki = () => {
    const [loadVisit, setLoadVisit] = useState('');
    const [bmiParams, setBmiParams] = useState({
        weight: 1,
        height: 1
    }
    );
    const auth = useContext(AuthContext)
    const patientContext = useContext(PatientContext);
    console.log(patientContext.gender);


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
    }

    return (
        <Container className={classes.newVisit}>
            <Card className={classes.cardsNewVisit}>

                <Row>
                    <Col> <span className={classes.subtitle}>Γενικά</span></Col>
                </Row>
                <Row>
                    <Col>
                        <label>Ημερομηνία*</label>
                        <input ref={dateInputRef} className={classes.date} name='date' type='date' defaultValue={moment(new Date()).format('YYYY-MM-DD')} required />
                        {/* <input  className={classes.date} name='date' type='date' required /> */}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label>Γενική εικόνα</label>
                        <input ref={geniki_eikonaInputRef} name='geniki_eikona' defaultValue={loadVisit.geniki_eikona} className={classes.fullSize} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Αιτία Προσέλευσης</label>
                        <input ref={geniki_eikonaInputRef} name='geniki_eikona' defaultValue={loadVisit.geniki_eikona} className={classes.fullSize} />
                    </Col>
                </Row>
                <Row>
                    <Col> <span className={classes.subtitle}>Βιομετρικά</span></Col>
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
                {(patientContext.gender === 'female') && <Row>
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
                </Row>}
                {(patientContext.gender === 'female') && <Row>
                    <Col>
                        <label>Τελευταία Έμμηνος Ρύση</label>
                        <input className={classes.date} type='date' />
                    </Col>
                </Row>}
                {(patientContext.gender === 'male') && <Row>
                    <Col className={classes.threeInput}><label>Όγκος Όρχεων(ml)</label><input ref={test_volumeInputRef} defaultValue={loadVisit.test_volume} name='test_volume' /></Col>
                </Row>}
                <Row>
                    <Col> <span className={classes.subtitle}>Υπερηχογράφημα Θυρεοειδούς</span></Col>
                </Row>
                <Row className={`justify-content-start ${classes.threeInput}`}>
                    <Col lg='3'><label >Ύψος Όζου(mm)</label> <input type='number' min={1} max={99} maxLength={2}/></Col>
                    <Col lg='3'><label >Βάθος Όζου(mm)</label> <input type='number' min={1} max={99} maxLength={2}/></Col>
                    <Col lg='3'><label >Μήκος Όζου(mm)</label> <input type='number' min={1} max={99} maxLength={2}/></Col>


                </Row>
                <Row className="justify-content-center"><Col md='10' className='text-center'><h2> </h2></Col></Row>

            </Card>
        </Container>
    );
};

export default Antikeimeniki;