import classes from './NewLabAnalysis.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useState} from 'react';
import GeneralBlood from './GeneralBlood';
import Thyro from './Thyro';
import Ypofysi from './Ypofysi';
import Parathyro from './Parathyro';
import NewLabSelect from './NewLabSelect';
import { useParams } from 'react-router-dom';


const NewLabAnalysis = (props) => {
    const [visitDate,setVisitDate]=useState();
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
        initialState = { ...defaultState, blood: true };
    }

    const [labAnalysisType, setLabAnalysisType] = useState(initialState);
    

    function changeVisitDateHandler(visitDate){
        setVisitDate(visitDate);
    }


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
                    <NewLabSelect clasname={classes.myselect} patientId={props.patientId} changeHandler={changeVisitDateHandler}/>
                </Col>

                <Col>
                    <label className={classes.myselect} htmlFor='labifo'>Τύπος Εξέτασης</label>
                    <select onChange={changeHandler} id='labinfo'>
                        <option value='blood' selected={type === 'blood' }>Γενική Αίματος</option>
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
                {labAnalysisType.blood && <GeneralBlood patientId={props.patientId} visitDate={visitDate}/>}
                {labAnalysisType.thyro && <Thyro patientId={props.patientId} visitDate={visitDate}/>}
                {labAnalysisType.ypofysi && <Ypofysi patientId={props.patientId} visitDate={visitDate}/>}
                {labAnalysisType.parathyro && <Parathyro patientId={props.patientId} visitDate={visitDate}/>}
                {labAnalysisType.epinefridia && <Parathyro patientId={props.patientId} visitDate={visitDate}/>}
            </Row>
        </Container>

    );
}

export default NewLabAnalysis;