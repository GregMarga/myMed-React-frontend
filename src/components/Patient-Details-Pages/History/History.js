import { Container, Col, Row } from "react-bootstrap";
import './History.css';
import SaveButton from '../../UI/SaveButton'
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useHttpClient } from "../../../hooks/http-hook";
import { useState, useEffect, useRef, useContext, Fragment } from "react";
import ErrorModal from "../../UI/ErrorModal";
import { AuthContext } from "../../../context/auth-context";
import Collapsible from 'react-collapsible';
import Conditions from "./Atomiko/Conditions";
import Allergies from "./Atomiko/Allergies/Allergies";
import Klironomiko from "./Klironomiko/Klironomiko";
import Surgeries from "./Surgeries/Surgeries";
import Pregnacy from "./Gynaikologiko/Pregnacy";
import Card from "../../UI/Card";
import classes from './Gynaikologiko/Gynaikologiko.module.css'
import Gynaikologiko from "./Gynaikologiko/Gynaikologiko";
import { PatientContext } from "../../../context/patient-context";
import { useParams } from "react-router-dom";


const History = (props) => {
    const { isLoading, sendRequest, error, clearError } = useHttpClient();

    const [conditionsList, setConditionsList] = useState([]);
    const [allergiesList, setAllergiesList] = useState([]);
    const [cleronomicalList, setCleronomicalList] = useState([]);
    const [surgeriesList, setSurgeriesList] = useState([]);
    const [pregnacyList, setPregnaciesList] = useState([]);
    const [gynaikologikoList, setGynaikologikoList] = useState({ emminarxi: null, stability: null, cycle_duration: null, period_duration: null, maieutiko: [], adk: null, tdk: null })

    const [stability, setStability] = useState(true);

    const paramsId = useParams().patientId;


    const stabilityChangeHandler = (event) => {
        setStability(event.target.value === 'true')

    }

    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const emminarxiInputRef = useRef();
    const stabilityInputRef = useRef();
    const emminopausiInputRef = useRef();
    const period_durationInputRef = useRef();
    const cycle_durationInputRef = useRef();
    const adkInputRef = useRef();
    const tdkInputRef = useRef();





    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/female`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                console.log(responseData)
                setConditionsList(responseData.conditionsList);
                setSurgeriesList(responseData.surgeries);
                setPregnaciesList(responseData.maieutiko);
                setCleronomicalList(responseData.cleronomicalList)
                responseData.allergies.map(allergy => {
                    setAllergiesList((prevState) => {
                        return [...prevState, allergy]
                    });
                })

                setGynaikologikoList(responseData.gynaikologiko)
                console.log(responseData)
            } catch (err) { }

        };
        if (!!patientContext.anamnistikoId) {
            fetchHistory();
        }
    }, []);



    const addConditionHandler = (condition) => {
        setConditionsList((prevState) => {
            return [...prevState, condition];
        })

    }

    const removeConditionHandler = (conditionIdToDelete) => {
        setConditionsList((prevState) => {
            return prevState.filter(condition => {
                return condition._id !== conditionIdToDelete
            })
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log('submit')
        try {
            const responseDate = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko`, 'POST',
                JSON.stringify({
                    allergies: allergiesList,
                    cleronomical: cleronomicalList,
                    conditions: conditionsList,
                    surgeries: surgeriesList,
                    gynaikologiko: {
                        emminarxi: emminarxiInputRef.current.value,
                        stability: stabilityInputRef.current.value,
                        cycle_duration: cycle_durationInputRef.current.value,
                        period_duration: period_durationInputRef.current.value,
                        emminopausi: emminopausiInputRef.current.value,
                        pregnacyList: pregnacyList,
                        adk: adkInputRef.current.checked,
                        tdk: tdkInputRef.current.checked,
                    }

                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            console.log(responseDate)
            patientContext.createAnamnistikoId(responseDate._id)

        } catch (err) { }
    }

    const updateHandler = async (event) => {
        event.preventDefault();

        try {
            await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko`, 'PATCH',
                JSON.stringify({
                    allergies: allergiesList,
                    cleronomical: cleronomicalList,
                    conditions: conditionsList,
                    surgeries: surgeriesList,
                    gynaikologiko: {
                        emminarxi: emminarxiInputRef.current.value,
                        stability: stabilityInputRef.current.value,
                        cycle_duration: cycle_durationInputRef.current.value,
                        period_duration: period_durationInputRef.current.value,
                        emminopausi: emminopausiInputRef.current.value,
                        pregnacyList: pregnacyList,
                        adk: adkInputRef.current.checked,
                        tdk: tdkInputRef.current.checked,
                    }



                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
        } catch (err) { }
    }

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {!!error && <ErrorModal error={error} onClear={clearError} />}

            <form className='history' onSubmit={(!patientContext.anamnistikoId) ? submitHandler : updateHandler}>
                <Container fluid>
                    <Collapsible trigger='Ατομικό>' triggerWhenOpen={'Ατομικό^'} transitionTime={200}>
                        <Conditions conditionsList={conditionsList} setConditionsList={setConditionsList} addConditionHandler={addConditionHandler} removeConditionHandler={removeConditionHandler} />
                        <Allergies allergiesList={allergiesList} setAllergiesList={setAllergiesList} />
                    </Collapsible>
                    <Collapsible trigger='Κληρονομικό' transitionTime={200}>
                        <Klironomiko cleronomicalList={cleronomicalList} setCleronomicalList={setCleronomicalList} />
                    </Collapsible>
                    <Collapsible trigger='Χειρουργεία' transitionTime={200}>
                        <Surgeries surgeriesList={surgeriesList} setSurgeriesList={setSurgeriesList} />
                    </Collapsible>
                    <Collapsible trigger='Γυναικολογικό' transitionTime={200}>
                        <Container>
                            <Row><Col className="text-center"><div ><h4>Έμμηνος Ρύση</h4></div></Col></Row>
                            <Card className={classes.erCard}>
                                <Row>
                                    <Col sm lg="2" className='text-end'><label>Εμμηναρχή</label></Col>
                                    <Col sm lg="2" className='text-start'><input type='number' placeholder="ηλικία σε έτη" ref={emminarxiInputRef} defaultValue={gynaikologikoList.emminarxi} /></Col>
                                </Row>
                                <Row>
                                    <Col className='text-end'><label>Σταθερότητα</label></Col>
                                    <Col>
                                        <select name='stability' onChange={stabilityChangeHandler} ref={stabilityInputRef}>
                                            <option value={false}>ασταθής</option>
                                            <option value={true} selected >σταθερή</option>
                                        </select>
                                    </Col>
                                    <Col className='text-end'><label>Διάρκεια Κύκλου</label></Col>
                                    <Col><input type='number' disabled={stability === false} ref={cycle_durationInputRef} defaultValue={!!(gynaikologikoList.cycle_duration) ? gynaikologikoList.cycle_duration : 28} /></Col>
                                    <Col className='text-end'><label>Διάρκεια Περιόδου</label></Col>
                                    <Col ><input type='number' ref={period_durationInputRef} defaultValue={gynaikologikoList.period_duration} /></Col>
                                </Row>
                                <Row>
                                    <Col sm={2} className='text-end'><label>Εμμηνόπαυση</label></Col>
                                    <Col sm={2} className='text-start'><input type='number' placeholder="ηλικία σε έτη" ref={emminopausiInputRef} defaultValue={gynaikologikoList.emminopausi} /></Col>
                                </Row>
                            </Card>
                            <Row><Col className="text-center"><div ><h4>Μαιευτικό Ιστορικό</h4></div></Col></Row>

                            <Pregnacy pregnacyList={pregnacyList} setPregnaciesList={setPregnaciesList} />
                            <Card className={classes.gynaikologikoCard}>
                                <Row>
                                    <Col sm={1} className='text-end'><input type='checkbox' ref={adkInputRef} defaultChecked={gynaikologikoList.adk} /></Col>
                                    <Col sm={3} className='text-start'>Αυτόματη Διακοπή Κύησης</Col>
                                </Row>
                                <Row>
                                    <Col sm={1} className='text-end'><input type='checkbox' ref={tdkInputRef} defaultChecked={gynaikologikoList.tdk} /></Col>
                                    <Col sm={3} className='text-start'>Τεχνητή Διακοπή Κύησης</Col>
                                </Row>
                            </Card>
                        </Container>
                    </Collapsible >
                    {/* {(patientContext.gender === 'female') && <Collapsible trigger='Γυναικολογικό' transitionTime={200}>
                        <Gynaikologiko />
                    </Collapsible>} */}


                </Container>
                {!isLoading && <SaveButton />}
            </form>
        </Fragment>
    );
}

export default History;