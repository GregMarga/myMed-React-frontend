import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, useContext, useRef, useReducer, Fragment } from "react";
import { useParams } from "react-router-dom";
import Collapsible from 'react-collapsible';
import LoadingSpinner from '../../UI/LoadingSpinner'
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../context/auth-context";
import { PatientContext } from "../../../context/patient-context";
import Diagnosis from "./Diagnosis/Diagnosis";
import Therapeia from "./Therapeia/Therapeia";
import classes from './Visit.module.css';
import Ozoi from "./Antikeimeniki/Ozoi/Ozoi";
import ErrorModal from '../../UI/ErrorModal'
import Antikeimeniki from "./Antikeimeniki/Antikeimeniki";

const defaultState = { oldDiagnosis: false, touchDiagnosisForm: false, oldTherapeia: false, touchTherapeiaForm: false, diagnosisList: [], loadedDiagnosisList: [], therapeiaList: [], loadedTherapeiaList: [] }


const reducer = (state, action) => {

    switch (action.type) {
        case 'oldDiagnosis':
            return { ...state, oldDiagnosis: action.payload.oldDiagnosis, diagnosisList: state.loadedDiagnosisList };
        case 'touchDiagnosis':
            return { ...state, touchDiagnosisForm: action.payload.touchDiagnosisForm };
        case 'oldTherapeia':
            return { ...state, oldTherapeia: action.payload.oldTherapeia, therapeiaList: state.loadedTherapeiaList };
        case 'touchTherapeia':
            return { ...state, touchTherapeiaForm: action.payload.touchTherapeiaForm };
        case 'addDiagnosisList':
            return { ...state, diagnosisList: [...state.diagnosisList, action.payload.diagnosis] };
        case 'removeDiagnosisList':
            return { ...state, diagnosisList: action.payload.diagnosisList }
        case 'editDiagnosisList':
            return { ...state, diagnosisList: action.payload.diagnosisList }
        case 'loadDiagnosisList':
            return { ...state, loadedDiagnosisList: action.payload.loadedDiagnosisList }
        case 'loadTherapeiaList':
            return { ...state, loadedTherapeiaList: action.payload.loadedTherapeiaList }
        case 'addTherapeiaList':
            return { ...state, therapeiaList: [...state.therapeiaList, action.payload.therapeia] };
        case 'removeTherapeiaList':
            return { ...state, therapeiaList: action.payload.therapeiaList }
        case 'oldVisit':

            return { ...state, oldDiagnosis: true, loadedDiagnosisList: action.payload.diagnosisList, loadedTherapeiaList: action.payload.therapeiaList, oldTherapeia: true, diagnosisList: action.payload.diagnosisList, therapeiaList: action.payload.therapeiaList }


        default:
            return state;
    }
}

const Visit = () => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const [ozosList, setOzosList] = useState([]);
    const [loadVisit, setLoadVisit] = useState('');
    const [bmiParams, setBmiParams] = useState({
        weight: 1,
        height: 1
    }
    );

    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const paramsId = useParams().patientId;
    const visitId = useParams().visitId
    const patientId = (paramsId === 'new') ? patientContext.patientId : paramsId;
    const { isLoading, sendRequest, error, clearError } = useHttpClient()


    useEffect(() => {
        if (!!visitId && visitId !== 'new') {
            patientContext.createVisitId(visitId)
        }
    }, [visitId]);


    useEffect(() => {

        const fetchHistory = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientId}/visits/info`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                console.log(responseData)
                // setOzosList(responseData.ozosList)
                // if (visitId !== 'new') {
                //     setLoadVisit(responseData.visit)
                // }
                // if (visitId === 'new') {
                //     dispatch({ type: 'loadDiagnosisList', payload: { loadedDiagnosisList: responseData.diagnosisList } })
                //     dispatch({ type: 'loadTherapeiaList', payload: { loadedTherapeiaList: responseData.therapeiaList } })
                //     setLoadVisit((prevState) => {
                //         return { ...prevState, height: responseData.visit.height, weight: responseData.visit.weight };
                //     })
                //     setBmiParams({ height: responseData.visit.height, weight: responseData.visit.weight })
                // } else {
                //     dispatch({ type: 'oldVisit', payload: { diagnosisList: responseData.diagnosisList, therapeiaList: responseData.therapeiaList } })

                // }
            } catch (err) { console.log(err) }

        };
        if (paramsId === 'new') {
            // fetchHistory();
        }

    }, [patientId, sendRequest, visitId]);


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
        console.log('submit')
        event.preventDefault();
        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientId}/visits`, 'POST',
                JSON.stringify({
                    date: dateInputRef.current.value,
                    geniki_eikona: geniki_eikonaInputRef.current.value,
                    aitia_proseleusis: aitia_proseleusisInputRef.current.value,
                    diagnosisList: state.diagnosisList,
                    ozosList: ozosList,
                    piesi: piesiInputRef.current.value,
                    sfiksis: sfiksisInputRef.current.value,
                    weight: weightInputRef.current.value,
                    height: heightInputRef.current.value,
                    smkt: smktInputRef.current.value,
                    tekt: tektInputRef.current.value,
                    // test_volume: test_volumeInputRef.current.value,
                    therapeiaList: state.therapeiaList,


                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
        } catch (err) { console.log(err) }
        // history.replace('/')
    }
    const updateHandler = async (event) => {
        console.log('update')
        event.preventDefault();
        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientId}/visits/${visitId}`, 'PATCH',
                JSON.stringify({
                    date: dateInputRef.current.value,
                    geniki_eikona: geniki_eikonaInputRef.current.value,
                    aitia_proseleusis: aitia_proseleusisInputRef.current.value,
                    diagnosisList: state.diagnosisList,
                    ozosList: ozosList,
                    piesi: piesiInputRef.current.value,
                    sfiksis: sfiksisInputRef.current.value,
                    weight: weightInputRef.current.value,
                    height: heightInputRef.current.value,
                    smkt: smktInputRef.current.value,
                    tekt: tektInputRef.current.value,
                    test_volume: test_volumeInputRef.current.value,
                    therapeiaList: state.therapeiaList,


                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
        } catch (err) { console.log(err) }
    }

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            {/* <form className={classes.visitForm} onSubmit={((visitId !== 'new') && (paramsId !== 'new')) ? updateHandler : submitHandler}> */}
            <Container fluid className={classes.visitForm}>
                <Collapsible trigger='Αντικειμενική Εξέταση >' triggerWhenOpen={'Αντικειμενική Εξέταση ^'} transitionTime={200}>
                    <Antikeimeniki />
                    <Ozoi />
                </Collapsible>
                <Collapsible trigger='Διαγνώσεις >' triggerWhenOpen={'Διαγνώσεις ^'} transitionTime={200}>
                    <Diagnosis loadedDiagnosisList={state.loadedDiagnosisList} diagnosisList={state.diagnosisList} state={state} dispatch={dispatch} />
                </Collapsible>
                <Collapsible trigger='Θεραπεία >' triggerWhenOpen={'Θεραπεία ^'} transitionTime={200}>
                    <Therapeia diagnosisList={state.diagnosisList} loadedTherapeiaList={state.loadedTherapeiaList} therapeiaList={state.therapeiaList} state={state} dispatch={dispatch} />
                </Collapsible>

            </Container>

            {/* </form> */}
        </Fragment>
    );
}

export default Visit;