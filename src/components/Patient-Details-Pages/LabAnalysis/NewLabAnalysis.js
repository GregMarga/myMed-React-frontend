import classes from './NewLabAnalysis.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useReducer, useEffect } from 'react';
import GeneralBlood from './GeneralBlood';
import Thyro from './Thyro';
import Ypofysi from './Ypofysi';
import Parathyro from './Parathyro';
import NewLabSelect from './NewLabSelect';
import { useParams } from 'react-router-dom';


const defaultState = {
    blood: false,
    thyro: false,
    parathyro: false,
    ypofysi: false,
    epinefridio: false,
    eggs: false,
    balls: false
}

function reducer(state, action) {
    switch (action.type) {
        case 'blood':
            return { ...defaultState, blood: true };
        case 'thyro':
            return { ...defaultState, thyro: true };
        case 'parathyro':
            return { ...defaultState, parathyro: true };
        case 'epinefridia':
            return { ...defaultState, epinefridia: true };
        case 'ypofysi':
            return { ...defaultState, ypofysi: true };
        case 'eggs':
            return { ...defaultState, eggs: true };
        case 'balls':
            return { ...defaultState, balss: true };

    }
}


const NewLabAnalysis = (props) => {
    const [visitDate, setVisitDate] = useState();
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
    const [state, dispatch] = useReducer(reducer, defaultState)

    useEffect(() => {
        if (typeof (type) === 'undefined') {
            dispatch({ type: 'blood' })
        } else {
            dispatch({ type: type })
        }
    }, [type])


    function changeVisitDateHandler(visitDate) {
        setVisitDate(visitDate);
    }


    function changeHandler(event) {
        const selectValue = event.target.value;
        switch (selectValue) {
            case 'blood':
                return dispatch({ type: 'blood' });
            case 'thyro':
                return dispatch({ type: 'thyro' });
            case 'parathyro':
                return dispatch({ type: 'parathyro' });
            case 'epinefridia':
                return dispatch({ type: 'epinefridia' });
            case 'ypofysi':
                return dispatch({ type: 'ypofysi' });
            case 'eggs':
                return dispatch({ type: 'eggs' });
            case 'balls':
                return dispatch({ type: 'balls' });
            case '':
                return dispatch({ type: '' });
        };
    }

    return (
        <Container className={classes.mylab}>
            <Row>
                <Col>
                    <NewLabSelect clasname={classes.myselect} patientId={props.patientId} changeHandler={changeVisitDateHandler} />
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
                {state.blood && <GeneralBlood patientId={props.patientId} visitDate={visitDate} />}
                {state.thyro && <Thyro patientId={props.patientId} visitDate={visitDate} />}
                {state.ypofysi && <Ypofysi patientId={props.patientId} visitDate={visitDate} />}
                {state.parathyro && <Parathyro patientId={props.patientId} visitDate={visitDate} />}
                {state.epinefridia && <Parathyro patientId={props.patientId} visitDate={visitDate} />}
            </Row>
        </Container>

    );
}

export default NewLabAnalysis;