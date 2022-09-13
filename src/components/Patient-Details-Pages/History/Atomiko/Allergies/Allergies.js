import { Container, Row, Col } from "react-bootstrap";
import classes from './Allergies.module.css'
import ConditionsFinder from '../ConditionsFinder';
import Card from "../../../../UI/Card";
import { Fragment, useContext, useEffect, useState } from "react";
import AllergiesLoaded from "./AllergiesLoaded";
import SaveButton from "../../../../UI/SaveButton";
import { v4 as uuid } from 'uuid';
import { AuthContext } from "../../../../../context/auth-context";
import { useHttpClient } from "../../../../../hooks/http-hook";
import { PatientContext } from "../../../../../context/patient-context";
import ErrorModal from "../../../../UI/ErrorModal";
import LoadingSpinner from "../../../../UI/LoadingSpinner";


const Allergies = (props) => {
    const [allergiesList, setAllergiesList] = useState([]);
    const [selectedCondition, setSelectedCondition] = useState({ code: '', condition: '' })
    const [selectedConditionsList, setSelectedConditionsList] = useState([])
    const [addAllergy, setAddAllergy] = useState(false);
    const [allergiesLoaded, setAllergiesLoaded] = useState(false);

    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext)
    const { error, clearError, isLoading, sendRequest } = useHttpClient()

    // console.log(allergiesList)

    useEffect(() => {
        const fetchAllergies = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/allergies`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                if (responseData.length > 0) {
                    setAllergiesList(responseData);
                    setAllergiesLoaded(true)
                }
            } catch (err) { }

        };
        if (!!patientContext.patientId) {
            fetchAllergies();
        }
    }, [patientContext.patientId, sendRequest]);


    useEffect(() => {
        if (!!props.profil) {
            setAllergiesLoaded(true)
        }
    }, [props.profil])

    useEffect(() => {
        if (allergiesLoaded) {
            setSelectedConditionsList([])
        }
    }, [allergiesLoaded])


    // useEffect(() => {
    //     if (allergiesList.length === 0) {
    //         setAllergiesLoaded(false)
    //     }
    // }, [allergiesList])

    // useEffect(() => {
    //     if (!!patientContext.anamnistikoId)
    //         setAllergiesLoaded(true);

    // }, [patientContext.anamnistikoId])


    const checkIfInList = (selectedName, list) => {
        let res = false;
        list.map(allergy => {
            if (allergy.name === selectedName) {
                return res = true
            }
        })
        return res;
    }
    const addToAllergyList = async (allergyName) => {
        const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
        console.log(allergyName, responseData)
        setAllergiesList((prevState) => {

            if (!checkIfInList(allergyName, allergiesList)) {

                return [...prevState, { name: allergyName, _id: responseData }]
            }
            else return [...prevState];
        })
        if (allergiesLoaded && allergiesList.length > 0) {
            console.log('innnnnnnnnn')
            try {
                await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/allergies_loaded`, 'POST',
                    JSON.stringify({
                        name: allergyName,
                        _id: responseData
                    })
                    , {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                );

            } catch (err) {

            }
        }
    }
    const removeFromAllergyList = async (allergyId) => {
        console.log(allergyId)
        try {
            if (allergiesLoaded) {
                await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/allergies/${allergyId}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });
            }
            setAllergiesList((prevState) => {
                return prevState.filter((allergy) => {
                    return allergy._id !== allergyId
                })
            })

        } catch (err) {

        }
    }


    const changeHandler = async (event) => {

        if (event.target.checked) {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            setAllergiesList((prevState) => {
                if (!checkIfInList(event.target.value, allergiesList)) {
                    return [...prevState, { name: event.target.value, _id: responseData }]
                }
                else return [...prevState];
            })
        }
        else if (!event.target.checked) {
            console.log(event.target.value, selectedConditionsList)
            if (checkIfInList(event.target.value, selectedConditionsList)) {
                setSelectedConditionsList(prevState => {
                    return prevState.filter(allergy => {
                        return allergy.name !== event.target.value
                    })
                })
                console.log(selectedConditionsList)
            }
            setAllergiesList((prevState) => {
                return prevState.filter((allergy) => {
                    return allergy.name !== event.target.value
                })
            })

        }
        console.log(allergiesList)
    }

    const addToSelectedConditionsList = async (hit) => {
        const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
        setSelectedConditionsList((prevState) => {
            return [...prevState, { name: hit.code + ': ' + hit.condition, _id: responseData }];
        })
        console.log(hit)
        addToAllergyList(hit.code + ': ' + hit.condition)
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(allergiesList)
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/allergies`, 'POST',
                JSON.stringify({
                    allergies: allergiesList
                })
                , {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            setAllergiesLoaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    return (

        <Container>
            {!!error && <ErrorModal error={error} onClear={clearError} />}

            {(!props.profil) && <Row><Col className="text-center"><div className={classes.title}><h4>Αλλεργίες</h4></div></Col></Row>}
            {isLoading && allergiesLoaded && <LoadingSpinner />}
            <form className={(!!props.profil) ? classes.infoAllergiesForm : classes.allergiesForm} onSubmit={submitHandler}>
                <Card className={(!!props.profil) ? classes.infoAllergiesCard : classes.allergiesForm}>
                    {allergiesLoaded && (allergiesList.length > 0) && <AllergiesLoaded allergiesList={allergiesList} addToAllergyList={addToAllergyList} removeFromAllergyList={removeFromAllergyList} />}
                    {allergiesLoaded && (allergiesList.length === 0) && <Fragment>
                        <Row>
                            <Col className="text-center">
                                Δεν υπάρχουν καταγεγραμμένες αλλεργίες,για να προσθέσετε πατήστε
                                <button type='button' className={classes.addLoaded} onClick={() => { setAllergiesLoaded(false) }}>Προσθήκη</button>
                            </Col>
                        </Row>
                    </Fragment>}
                    {!allergiesLoaded && <Fragment>
                        <Row className="justify-content-space-around">
                            <Col xs={1}></Col>
                            <Col xs={5}><h5>Γενικές αλλεργία</h5></Col>
                            <Col xs={1}></Col>
                            <Col xs={5}><h5>Αλλεργίες σε Φάρμακα</h5></Col>
                        </Row>
                        <Row>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='Τ78.4: Αλλεργία,μη καθορισμένη' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>Τ78.4: Αλλεργία,μη καθορισμένη</label>
                            </Col>
                            <Col xs={2} md={1} className='text-end'>
                                <input type='checkbox' value='Ζ88.1: Ατομικό ιστορικό αλλεργίας στην πενικιλίνη' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>Ζ88.1: Ατομικό ιστορικό αλλεργίας στην πενικιλίνη</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='J30.1: Αλλεργική ρινίτιδα που οφείλεται στη γύρη' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>J30.1: Αλλεργική ρινίτιδα που οφείλεται στη γύρη</label>
                            </Col>

                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='Z88.2: Ατομικό ιστορικό αλλεργίας σε άλλους αντιβιοτικούς παράγοντες' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>Z88.2: Ατομικό ιστορικό αλλεργίας σε άλλους αντιβιοτικούς παράγοντες</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='J30.2:  Άλλη εποχική αλλεργική ρινίτιδα' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>J30.2:  Άλλη εποχική αλλεργική ρινίτιδα</label>
                            </Col>

                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='Z88.3: Ατομικό ιστορικό αλλεργίας στις σουλφοναμίδες' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>Z88.3: Ατομικό ιστορικό αλλεργίας στις σουλφοναμίδες</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='J30.3: Άλλη αλλεργική ρινίτιδα' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>J30.3: Άλλη αλλεργική ρινίτιδα</label>
                            </Col>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='Z88.4: Ατομικό ιστορικό αλλεργίας σε άλλους παράγοντες κατά των λοιμώξεων' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>Z88.4: Ατομικό ιστορικό αλλεργίας σε άλλους παράγοντες κατά των λοιμώξεων</label>

                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='J30.4: Αλλεργική ρινίτιδα, μη καθορισμένη' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start" >
                                <label>J30.4: Αλλεργική ρινίτιδα, μη καθορισμένη</label>
                            </Col>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='Z88.5: Ατομικό ιστορικό αλλεργίας σε αναισθητικό παράγοντα' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>Z88.5: Ατομικό ιστορικό αλλεργίας σε αναισθητικό παράγοντα</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='J45: Κυρίως αλλεργικό άσθμα' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>J45: Κυρίως αλλεργικό άσθμα</label>
                            </Col>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='Z88.6: Ατομικό ιστορικό αλλεργίας σε ναρκωτικό παράγοντα' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>Z88.6: Ατομικό ιστορικό αλλεργίας σε ναρκωτικό παράγοντα</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='K52.2: Αλλεργική και διαιτητική γαστρεντερίτιδα και κολίτιδα' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>K52.2: Αλλεργική και διαιτητική γαστρεντερίτιδα και κολίτιδα</label>
                            </Col>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='Z88.7: Ατομικό ιστορικό αλλεργίας σε ορό και εμβόλιο' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>Z88.7: Ατομικό ιστορικό αλλεργίας σε ορό και εμβόλιο</label>

                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='L23: Αλλεργική δερματίτιδα εξ επαφής' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>L23: Αλλεργική δερματίτιδα εξ επαφής </label>
                            </Col>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='Z88.8: Ατομικό ιστορικό αλλεργίας σε άλλα φάρμακα, φαρμακευτικές και βιολογικές ουσίες' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>Z88.8: Ατομικό ιστορικό αλλεργίας σε άλλα φάρμακα, φαρμακευτικές και βιολογικές ουσίες</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='L50.0: Αλλεργική κνίδωση' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>L50.0: Αλλεργική κνίδωση</label>
                            </Col>
                            <Col className="text-end" xs={2} md={1}>
                                <input type='checkbox' value='Z88.9: Ατομικό ιστορικό αλλεργίας σε μη καθορισμένα φάρμακα, φαρμακευτικές και βιολογικές ουσίες' onChange={changeHandler} />
                            </Col>
                            <Col className="text-start">
                                <label>Z88.9: Ατομικό ιστορικό αλλεργίας σε μη καθορισμένα φάρμακα, φαρμακευτικές και βιολογικές ουσίες</label>
                            </Col>

                        </Row>
                        {selectedConditionsList.map((condition) => {
                            return (
                                <Row key={uuid()}>
                                    <Col className="text-end" xs={2} md={1}>
                                        <input defaultChecked type='checkbox' value={`${condition.name}`} onChange={changeHandler} />
                                    </Col>
                                    <Col xs={6}>
                                        <label>{`${condition.name}`}</label>
                                    </Col>
                                </Row>
                            );
                        })}
                        <Row>
                            <Col>
                                {addAllergy && <ConditionsFinder add addToSelectedConditionsList={addToSelectedConditionsList} setSelectedCondition={setSelectedCondition} setSelectedConditionsList={setSelectedConditionsList} setAddAllergy={setAddAllergy} />}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {!addAllergy && <button className={classes.addCondition} onClick={() => { setAddAllergy(true) }}>Προσθήκη Αλλεργίας</button>}
                            </Col>
                        </Row>
                        {/* <Row>
                        <Col><label>Άλλα</label><input type='text'/></Col>
                    </Row> */}
                    </Fragment>}
                    {!allergiesLoaded && <Row>
                        <Col>
                            <SaveButton />
                        </Col>
                    </Row>}
                </Card>
            </form>
        </Container>
    );
};

export default Allergies;