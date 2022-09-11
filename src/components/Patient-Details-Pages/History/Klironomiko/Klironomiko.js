import { Container, Row, Col } from "react-bootstrap";
import classes from './Klironomiko.module.css';
import KlironomikoOptions from "./KlironomikoOptions";
import Card from "../../../UI/Card";
import ConditionsFinder from "../Atomiko/ConditionsFinder";
import KlirnomikoLoaded from "./KlironomikoLoaded";
import SaveButton from '../../../UI/SaveButton'
import ErrorModal from "../../../UI/ErrorModal";
import LoadingSpinner from "../../../UI/LoadingSpinner";
import { Fragment, useContext, useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import { AuthContext } from "../../../../context/auth-context";
import { useHttpClient } from "../../../../hooks/http-hook";
import { PatientContext } from "../../../../context/patient-context";


const Klironomiko = (props) => {
    const [selectedCondition, setSelectedCondition] = useState({ code: '', condition: '' })
    const [cleronomicalList, setCleronomicalList] = useState([]);
    const [klirnomikoLoaded, setKlironomikoLoaded] = useState(false);
    const auth = useContext(AuthContext)
    const patientContext = useContext(PatientContext);
    const { error, clearError, isLoading, sendRequest } = useHttpClient()
    const [selectedConditionsList, setSelectedConditionsList] = useState([])
    const [addKlironomiko, setAddKlironomiko] = useState(false);

    console.log(cleronomicalList)

    useEffect(() => {
        const fetchKlironomiko = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/klironomiko`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                if (responseData.length > 0) {
                    setCleronomicalList(responseData);
                    setKlironomikoLoaded(true)
                }
            } catch (err) { }

        };
        if (!!patientContext.patientId) {
            fetchKlironomiko();
        }
    }, [patientContext.patientId, sendRequest]);

    useEffect(() => {
        if (cleronomicalList.length === 0) {
            setKlironomikoLoaded(false)
        }
    }, [cleronomicalList])

    

    const checkIfInList = (selectedName, list) => {
        let res = false;
        list.map(allergy => {
            if (allergy.name === selectedName) {
                return res = true
            }
        })
        return res;
    }
    const addToCleronomicalList = async (allergyName) => {
        const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });

        setCleronomicalList((prevState) => {

            if (!checkIfInList(allergyName,cleronomicalList)) {

                return [...prevState, { name: allergyName, _id: responseData }]
            }
            else return [...prevState];
        })
    }
    const removeFromCleronomicalList = async (klironomikoId) => {
        console.log(klironomikoId)
        try {
            if (klirnomikoLoaded) {
                await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/klironomiko/${klironomikoId}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });
            }
            setCleronomicalList((prevState) => {
                return prevState.filter((klironomiko) => {
                    return klironomiko._id !== klironomikoId
                })
            })
        } catch (err) {
            console.log(err)
        }
    }

    const changeHandler = async (event) => {        
        if (event.target.checked) {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            setCleronomicalList((prevState) => {
                if (!checkIfInList(event.target.value,cleronomicalList)) {
                    return [...prevState, { name: event.target.value, _id: responseData }]
                }
                else return [...prevState];
            })
        }
        else if (!event.target.checked) {
            console.log(event.target.value,selectedConditionsList)
            if (checkIfInList(event.target.value, selectedConditionsList)) {
                setSelectedConditionsList(prevState => {
                    return prevState.filter(allergy => {
                        return allergy.name !== event.target.value
                    })
                })
                console.log(selectedConditionsList)
            }
            setCleronomicalList((prevState) => {
                return prevState.filter((allergy) => {
                    return allergy.name !== event.target.value
                })
            })

        }
        console.log(cleronomicalList)
    }

    const addToSelectedConditionsList = async (hit) => {
        const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
        setSelectedConditionsList((prevState) => {
            return [...prevState, { name: hit.code + ': ' + hit.condition, _id: responseData  }];
        })
        console.log(hit)
        addToCleronomicalList(hit.code+': '+hit.condition)
    }


    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(cleronomicalList)
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/klironomiko`, 'POST',
                JSON.stringify({
                    cleronomical: cleronomicalList
                })
                , {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            setKlironomikoLoaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container className={classes.klironomiko}>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <form onSubmit={submitHandler} >
                <Card className={(!!props.profil) ? classes.klironomikoInfoCard : classes.klironomikoCard}>
                    {isLoading && klirnomikoLoaded && <LoadingSpinner />}
                    {klirnomikoLoaded && <KlirnomikoLoaded cleronomicalList={cleronomicalList} addToCleronomicalList={addToCleronomicalList} removeFromCleronomicalList={removeFromCleronomicalList} />}
                    {!klirnomikoLoaded && <Fragment>
                        <KlironomikoOptions label='Z83.3: Οικογενειακό ιστορικό σακχαρώδους διαβήτη' changeHandler={changeHandler} />
                        <KlironomikoOptions label='Z83.4: Οικογενειακό ιστορικό άλλων ενδοκρινικών, διατροφικών και μεταβολικών νοσημάτων' changeHandler={changeHandler} />
                        <KlironomikoOptions label='E78.0 Αμιγής υπερχοληστερολαιμία' changeHandler={changeHandler} />
                        <KlironomikoOptions label='Z81.1: Οικογενειακό ιστορικό κατάχρησης οινοπνεύματος' changeHandler={changeHandler} />
                        <KlironomikoOptions label='Z81.2: Οικογενειακό ιστορικό κατάχρησης καπνού' changeHandler={changeHandler} />
                        {selectedConditionsList.map((condition) => {
                            return (
                                <KlironomikoOptions label={`${condition.name}`} changeHandler={changeHandler} key={uuid()} defaultChecked addToCleronomicalList={addToCleronomicalList} />

                            );
                        })}
                        <Row>
                            <Col>
                                {addKlironomiko && <ConditionsFinder add addToSelectedConditionsList={addToSelectedConditionsList} setSelectedCondition={setSelectedCondition} setSelectedConditionsList={setSelectedConditionsList} setAddAllergy={setAddKlironomiko} />}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {!addKlironomiko && <button className={classes.addKlironomiko} onClick={() => { setAddKlironomiko(true) }}>Προσθήκη Πάθησης</button>}
                            </Col>
                        </Row>
                    </Fragment>}
                    {!klirnomikoLoaded && <Row>
                        <Col>
                            <SaveButton />
                        </Col>
                    </Row>}
                </Card>
            </form>
        </Container >
    );
}
export default Klironomiko;