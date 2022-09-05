import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../../../UI/Card";
import classes from './Gynaikologiko.module.css'
import Pregnacy from '../../../Patient-Details-Pages/History/Gynaikologiko/Pregnacy'
import ErrorModal from "../../../UI/ErrorModal";
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";


const GynaikologikoInfo = (props) => {
    const [gynaikologiko, setGynaikologiko] = useState({ emminarxi: null, stability: null, cycle_duration: null, period_duration: null, maieutiko: [], adk: null, tdk: null })
    const [pregnacyList, setPregacyList] = useState([])
    const [stability, setStability] = useState(true);
    const [editGynaikologiko, setEditGynaikologiko] = useState(false)


    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { error, sendRequest, clearError } = useHttpClient();

    const stabilityChangeHandler = (event) => {
        setStability(event.target.value === 'true')

    }

    useEffect(() => {
        const fetchGynaikologiko = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/gynaikologiko`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                console.log(responseData)
                setGynaikologiko(responseData.gynaikologiko)
                setPregacyList(responseData.pregnacyList)
            } catch (err) { }

        };
        if (!!patientContext.patientId) {
            fetchGynaikologiko();
        }
    }, [patientContext.patientId, sendRequest]);

    return (
        <Container>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Card className={classes.gynaikologikoInfoCard}>
                <Card className={classes.erCard}>
                    <Row>
                        <Col sm lg="2" className='text-end'><label>Εμμηναρχή</label></Col>
                        <Col sm lg="2" className='text-start'><input disabled={!editGynaikologiko} type='number' placeholder="ηλικία σε έτη" value={gynaikologiko.emminarxiInputRef} /></Col>
                    </Row>
                    <Row>
                        <Col className='text-end'><label>Σταθερότητα</label></Col>
                        <Col>
                            <select name='stability' onChange={stabilityChangeHandler} value={gynaikologiko.stabilityInputRef} disabled={!editGynaikologiko}>
                                <option value={false} selected={!gynaikologiko.stabilityInputRef}>ασταθής</option>
                                <option value={true} selected >σταθερή</option>
                            </select>
                        </Col>
                        <Col className='text-end'><label>Διάρκεια Κύκλου</label></Col>
                        <Col><input disabled={!editGynaikologiko || stability === false} type='number' defaultValue={28} value={gynaikologiko.cycle_durationInputRef} /></Col>
                        <Col className='text-end'><label>Διάρκεια Περιόδου</label></Col>
                        <Col ><input disabled={!editGynaikologiko} type='number' value={gynaikologiko.period_durationInputRef} /></Col>
                    </Row>
                    <Row>
                        <Col sm={2} className='text-end'><label>Εμμηνόπαυση</label></Col>
                        <Col sm={2} className='text-start'><input disabled={!editGynaikologiko} type='number' placeholder="ηλικία σε έτη" value={gynaikologiko.emminopausiInputRef} /></Col>
                    </Row>
                </Card>
                <Row><Col className="text-center"><div ><h4>Μαιευτικό Ιστορικό</h4></div></Col></Row>

                <Pregnacy info editGynaikologiko={editGynaikologiko} pregnacyList={pregnacyList} setPregnaciesList={setPregacyList} />
                <Card className={classes.gynaikologikoCard}>
                    <Row>
                        <Col sm={1} className='text-end'><input disabled={!editGynaikologiko} type='checkbox' value={props.adkInputRef} defaultChecked={gynaikologiko.adk} /></Col>
                        <Col sm={3} className='text-start'>Αυτόματη Διακοπή Κύησης</Col>
                    </Row>
                    <Row>
                        <Col sm={1} className='text-end'><input disabled={!editGynaikologiko} type='checkbox' value={props.tdkInputRef} defaultChecked={gynaikologiko.tdk} /></Col>
                        <Col sm={3} className='text-start'>Τεχνητή Διακοπή Κύησης</Col>
                    </Row>
                </Card>
                <Row className="justify-content-sm-end">
                    <Col sm={3}>
                        {!editGynaikologiko && <button className={classes.editGynaikologikoButton} type="button" onClick={() => { setEditGynaikologiko(true) }}>Επεξεργασία</button>}
                        {editGynaikologiko && <button className={classes.editGynaikologikoButton} type="button" onClick={() => { setEditGynaikologiko(true) }}>Αποθήκευση</button>}
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default GynaikologikoInfo;