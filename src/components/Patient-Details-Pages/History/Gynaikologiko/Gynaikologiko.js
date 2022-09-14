import { Container, Row, Col } from "react-bootstrap";
import { useContext, useState, useRef, useEffect } from "react";
import Pregnacy from './Pregnacy'
import Card from "../../../UI/Card";
import classes from './Gynaikologiko.module.css';
import SaveButton from '../../../UI/SaveButton';
import EditFormButton from "../../../UI/EditFormButton";
import ErrorModal from "../../../UI/ErrorModal";
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";



const Gynaikologiko = (props) => {
    const [gynaikologiko, setGynaikologiko] = useState({ emminarxi: null, stability: null, cycle_duration: null, period_duration: null, maieutiko: [], adk: null, tdk: null })
    const [editGynaikologiko, setEditGynaikologiko] = useState(false)
    const [stability, setStability] = useState(true);

    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { error, clearError, sendRequest, isLoading } = useHttpClient();

    const emminarxiInputRef = useRef();
    const stabilityInputRef = useRef();
    const emminopausiInputRef = useRef();
    const period_durationInputRef = useRef();
    const cycle_durationInputRef = useRef();
    const adkInputRef = useRef();
    const tdkInputRef = useRef();

    useEffect(() => {
        const fetchGynaikologiko = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/anamnistiko/gynaikologiko`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                console.log(responseData)
                if (!!responseData) {
                    setGynaikologiko(responseData);
                    setEditGynaikologiko(true)
                    console.log(gynaikologiko)
                }
            } catch (err) { console.log(err) }

        };
        if (!!patientContext.patientId) {
            fetchGynaikologiko();
        }
    }, [patientContext.patientId, sendRequest]);




    const stabilityChangeHandler = (event) => {
        setStability(event.target.value === 'true')

    }

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log('submit')
        try {
            const responseDate = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/anamnistiko/gynaikologiko`, 'POST',
                JSON.stringify({
                    emminarxi: emminarxiInputRef.current.value,
                    stability: stabilityInputRef.current.value,
                    cycle_duration: cycle_durationInputRef.current.value,
                    period_duration: period_durationInputRef.current.value,
                    emminopausi: emminopausiInputRef.current.value,


                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            console.log(responseDate)
            // patientContext.createAnamnistikoId(responseDate._id)
            setEditGynaikologiko(true)

        } catch (err) { console.log(err) }
    }
    const updateHandler = async (event) => {
        event.preventDefault();
        console.log('update')
        try {
            const responseDate = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/anamnistiko/gynaikologiko`, 'PATCH',
                JSON.stringify({
                    emminarxi: emminarxiInputRef.current.value,
                    stability: stabilityInputRef.current.value,
                    cycle_duration: cycle_durationInputRef.current.value,
                    period_duration: period_durationInputRef.current.value,
                    emminopausi: emminopausiInputRef.current.value,


                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            console.log(responseDate)
            patientContext.createAnamnistikoId(responseDate._id)
            setEditGynaikologiko(false)

        } catch (err) { console.log(err) }
    }



    return (
        <Container>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Row><Col className="text-center"><div ><h4>Έμμηνος Ρύση</h4></div></Col></Row>
            <form onSubmit={(!editGynaikologiko) ? submitHandler : updateHandler}>
                <Card className={classes.erCard}>
                    <Row>
                        <Col sm lg="2" className='text-sm-end'><label>Εμμηναρχή</label></Col>
                        <Col sm lg="2" className='text-start'><input min={1} max={99} disabled={editGynaikologiko} type='number' placeholder="ηλικία σε έτη" ref={emminarxiInputRef} defaultValue={gynaikologiko.emminarxi} required /></Col>
                    </Row>
                    <Row>
                        <Col sm={6}  lg={2} className='text-sm-end'><label>Σταθερότητα</label></Col>
                        <Col sm={6}  lg={2}>
                            <select name='stability' onChange={stabilityChangeHandler} ref={stabilityInputRef} disabled={editGynaikologiko}>
                                <option value={false} selected={!gynaikologiko.stabilityInputRef}>ασταθής</option>
                                <option value={true} selected >σταθερή</option>
                            </select>
                        </Col>
                        <Col sm={6}  lg={2} className='text-sm-end'><label>Διάρκεια Κύκλου</label></Col>
                        <Col sm={6}  lg={2}><input min={1} max={999} type='number' placeholder="διάρκεια σε ημέρες" defaultValue={(gynaikologiko.cycle_duration !== 28) ? (gynaikologiko.cycle_duration) : 28} disabled={(stability === false) || editGynaikologiko} ref={cycle_durationInputRef} /></Col>
                        <Col sm={6}  lg={2} className='text-sm-end'><label>Διάρκεια Περιόδου</label></Col>
                        <Col sm={6}  lg={2}><input min={1} max={99} type='number' placeholder="διάρκεια σε ημέρες" disabled={editGynaikologiko} defaultValue={gynaikologiko.period_duration} ref={period_durationInputRef} /></Col>
                    </Row>
                    <Row>
                        <Col sm={6}  lg={2} className='text-sm-end'><label>Εμμηνόπαυση</label></Col>
                        <Col sm={6}  lg={2} className='text-start'><input min={1} max={99} disabled={editGynaikologiko} type='number' placeholder="ηλικία σε έτη" ref={emminopausiInputRef} defaultValue={gynaikologiko.emminopausi} /></Col>
                    </Row>
                    {!isLoading && <Row className="justify-content-sm-end">
                        <Col >
                            {editGynaikologiko && <EditFormButton onClick={() => { setEditGynaikologiko(false) }} />}
                            {!editGynaikologiko && <SaveButton />}
                        </Col>
                    </Row>}
                </Card>

            </form>
            <Row><Col className="text-center"><div ><h4>Μαιευτικό Ιστορικό</h4></div></Col></Row>

            <Pregnacy pregnacyList={props.pregnacyList} setPregnaciesList={props.setPregnaciesList} />



        </Container>
    );
}

export default Gynaikologiko;