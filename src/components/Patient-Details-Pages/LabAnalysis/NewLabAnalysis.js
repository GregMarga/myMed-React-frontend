import classes from './NewLabAnalysis.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import GeneralBlood from './GeneralBlood';
import Thyro from './Thyro';
import Ypofysi from './Ypofysi';
import Parathyro from './Parathyro';
import NewLabSelect from './NewLabSelect';
import { useParams } from 'react-router-dom';


const NewLabAnalysis = (props) => {
    const type = useParams().type;
    const defaultState = {
        blood: false,
        thyro: false,
        parathyro: false,
        ypofysi: false,
        epinefridio: false,
        eggs: false,
        balls: false
    }
    let initialState = {
        blood: false,
        thyro: false,
        parathyro: false,
        ypofysi: false,
        epinefridio: false,
        eggs: false,
        balls: false
    }
    Object.keys(initialState).map((key) => {
        if (key === type) {
            initialState[key] = true;
        }
    })
    if (typeof (type) === 'undefined') {
        console.log(true)
        initialState = { ...defaultState, blood: true };
    }

    const [labAnalysisType, setLabAnalysisType] = useState(initialState);


    function changeHandler(event) {
        const selectValue = event.target.value;

        if (selectValue === 'blood') {
            setLabAnalysisType({
                ...defaultState, blood: true
            }
            );
        }
        if (selectValue === 'thyro') {
            setLabAnalysisType({
                ...defaultState, thyro: true
            }
            );
        }
        if (selectValue === 'parathyro') {
            setLabAnalysisType({
                ...defaultState, parathyro: true
            }
            );
        }
        if (selectValue === 'ypofysi') {
            setLabAnalysisType({
                ...defaultState, ypofysi: true
            }
            );
        }
        if (selectValue === 'epinefridia') {
            setLabAnalysisType({
                ...defaultState, epinefridio: true
            }
            );
        }
        if (selectValue === 'eggs') {
            setLabAnalysisType({
                ...defaultState, eggs: true
            }
            );
        }
        if (selectValue === 'balls') {
            setLabAnalysisType({
                ...defaultState, balls: true
            }
            );
        }
    }
    return (
        <Container className={classes.mylab}>
            <Row>
                <Col>
                    <NewLabSelect clasname={classes.myselect} patientId={props.patientId}/>
                    {/* <label className={classes.myselect}>Επίσκεψη</label>
                    <select>
                        <option>Πρώτη Επίσκεψη</option>
                        <option>Δεύτερη Επίσκεψη</option>
                    </select> */}
                </Col>

                <Col>
                    <label className={classes.myselect} htmlFor='labifo'>Τύπος Εξέτασης</label>
                    <select onChange={changeHandler} id='labinfo'>
                        <option value='blood' selected={type === 'blood'}>Γενική Αίματος</option>
                        <option value='thyro' selected={type === 'thyro'}>Θυρεοειδής</option>
                        <option value='parathyro' selected={type === 'parathyro'}>Παραθυρεοειδής</option>
                        <option value='ypofysi' selected={type === 'ypofysi'}>Υπόφυση</option>
                        <option value='epinefridia' selected={type === 'epinefridia'}>Επινεφρίδια</option>
                        <option value='eggs' selected={type === 'eggs'}>Ωοθήκες</option>
                        <option value='balls'>Όρχεις</option>
                    </select>
                </Col>
            </Row>
            <Row>
                {labAnalysisType.blood && <GeneralBlood patientId={props.patientId} />}
                {labAnalysisType.thyro && <Thyro patientId={props.patientId} />}
                {labAnalysisType.ypofysi && <Ypofysi patientId={props.patientId} />}
                {labAnalysisType.parathyro && <Parathyro patientId={props.patientId} />}
                {labAnalysisType.epinefridia && <Parathyro patientId={props.patientId} />}
            </Row>
        </Container>

    );
}

export default NewLabAnalysis;