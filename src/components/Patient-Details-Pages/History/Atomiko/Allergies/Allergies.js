import { Container, Row, Col } from "react-bootstrap";
import classes from './Allergies.module.css'
import ConditionsFinder from '../ConditionsFinder';
import Card from "../../../../UI/Card";
import { Fragment, useEffect, useState } from "react";
import AllergiesLoaded from "./AllergiesLoaded";
import { v4 as uuid } from 'uuid';


const Allergies = (props) => {
    const [selectedCondition, setSelectedCondition] = useState({ code: '', condition: '' })
    const [selectedConditionsList, setSelectedConditionsList] = useState([])
    const [addAllergy, setAddAllergy] = useState(false);
    const [allergiesLoaded, setAllergiesLoaded] = useState(true);

    const checkDefault = (checkboxName) => {
        let result;
        props.allergiesList.map((allergy) => {
            // console.log(checkboxName,'allergy:',allergy)
            if (allergy === checkboxName) {
                // console.log('in',allergy)
                result = true;
            } else {
                result = false;
            }
        })
        // console.log(checkboxName,result)
        return result;
    };
    console.log(props.allergiesList)
    // console.log(checkDefault('Τ78.4: Αλλεργία,μη καθορισμένη'))

    const changeHandler = (event) => {
        if (event.target.checked) {
            props.setAllergiesList((prevState) => {

                if (!props.allergiesList.includes(event.target.value)) {
                    return [...prevState, event.target.value]
                }
                else return [...prevState];
            })
        }
        else if (!event.target.checked) {
            props.setAllergiesList((prevState) => {
                return prevState.filter((allergy) => {
                    return allergy !== event.target.value
                })
            })
        }
        console.log(props.allergiesList)
    }


    return (

        <Container>
            <Row><Col className="text-center"><div className={classes.title}><h4>Αλλεργίες</h4></div></Col></Row>
            {/* <form className={classes.allergiesForm}> */}
            <Card>
                {allergiesLoaded && <AllergiesLoaded allergiesList={props.allergiesList} />}
                {!allergiesLoaded && <Fragment>
                    <Row className="justify-content-space-around">
                        <Col xs={1}></Col>
                        <Col xs={5}><h5>Γενικές αλλεργία</h5></Col>
                        <Col xs={1}></Col>
                        <Col xs={5}><h5>Αλλεργίες σε Φάρμακα</h5></Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='Τ78.4: Αλλεργία,μη καθορισμένη' onChange={changeHandler} defaultChecked={checkDefault('Τ78.4: Αλλεργία,μη καθορισμένη')} />
                        </Col>
                        <Col className="text-start">
                            <label>Τ78.4: Αλλεργία,μη καθορισμένη</label>
                        </Col>
                        <Col xs={1} className='text-end'>
                            <input type='checkbox' value='Ζ88.1: Ατομικό ιστορικό αλλεργίας στην πενικιλίνη' onChange={changeHandler} defaultChecked={checkDefault('Ζ88.1: Ατομικό ιστορικό αλλεργίας στην πενικιλίνη')} />
                        </Col>
                        <Col className="text-start">
                            <label>Ζ88.1: Ατομικό ιστορικό αλλεργίας στην πενικιλίνη</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='J30.1: Αλλεργική ρινίτιδα που οφείλεται στη γύρη' onChange={changeHandler} defaultChecked={checkDefault('J30.1: Αλλεργική ρινίτιδα που οφείλεται στη γύρη')} />
                        </Col>
                        <Col className="text-start">
                            <label>J30.1: Αλλεργική ρινίτιδα που οφείλεται στη γύρη</label>
                        </Col>

                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='Z88.2: Ατομικό ιστορικό αλλεργίας σε άλλους αντιβιοτικούς παράγοντες' onChange={changeHandler} defaultChecked={checkDefault('Z88.2: Ατομικό ιστορικό αλλεργίας σε άλλους αντιβιοτικούς παράγοντες')} />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.2: Ατομικό ιστορικό αλλεργίας σε άλλους αντιβιοτικούς παράγοντες</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='J30.2:  Άλλη εποχική αλλεργική ρινίτιδα' onChange={changeHandler} defaultChecked={checkDefault('J30.2:  Άλλη εποχική αλλεργική ρινίτιδα')} />
                        </Col>
                        <Col className="text-start">
                            <label>J30.2:  Άλλη εποχική αλλεργική ρινίτιδα</label>
                        </Col>

                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='Z88.3: Ατομικό ιστορικό αλλεργίας στις σουλφοναμίδες' onChange={changeHandler} defaultChecked={checkDefault('Z88.3: Ατομικό ιστορικό αλλεργίας στις σουλφοναμίδες')} />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.3: Ατομικό ιστορικό αλλεργίας στις σουλφοναμίδες</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='J30.3: Άλλη αλλεργική ρινίτιδα' onChange={changeHandler} defaultChecked={checkDefault('J30.3: Άλλη αλλεργική ρινίτιδα')} />
                        </Col>
                        <Col className="text-start">
                            <label>J30.3: Άλλη αλλεργική ρινίτιδα</label>
                        </Col>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='Z88.4: Ατομικό ιστορικό αλλεργίας σε άλλους παράγοντες κατά των λοιμώξεων' onChange={changeHandler} defaultChecked={checkDefault('Z88.4: Ατομικό ιστορικό αλλεργίας σε άλλους παράγοντες κατά των λοιμώξεων')} />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.4: Ατομικό ιστορικό αλλεργίας σε άλλους παράγοντες κατά των λοιμώξεων</label>

                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='J30.4: Αλλεργική ρινίτιδα, μη καθορισμένη' onChange={changeHandler} defaultChecked={checkDefault('J30.4: Αλλεργική ρινίτιδα, μη καθορισμένη')} />
                        </Col>
                        <Col className="text-start" >
                            <label>J30.4: Αλλεργική ρινίτιδα, μη καθορισμένη</label>
                        </Col>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='Z88.5: Ατομικό ιστορικό αλλεργίας σε αναισθητικό παράγοντα' onChange={changeHandler} defaultChecked={checkDefault('Z88.5: Ατομικό ιστορικό αλλεργίας σε αναισθητικό παράγοντα')} />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.5: Ατομικό ιστορικό αλλεργίας σε αναισθητικό παράγοντα</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='J45: Κυρίως αλλεργικό άσθμα' onChange={changeHandler} defaultChecked={checkDefault('J45: Κυρίως αλλεργικό άσθμα')} />
                        </Col>
                        <Col className="text-start">
                            <label>J45: Κυρίως αλλεργικό άσθμα</label>
                        </Col>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='Z88.6: Ατομικό ιστορικό αλλεργίας σε ναρκωτικό παράγοντα' onChange={changeHandler} defaultChecked={checkDefault('Z88.6: Ατομικό ιστορικό αλλεργίας σε ναρκωτικό παράγοντα')} />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.6: Ατομικό ιστορικό αλλεργίας σε ναρκωτικό παράγοντα</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='K52.2: Αλλεργική και διαιτητική γαστρεντερίτιδα και κολίτιδα' onChange={changeHandler} defaultChecked={checkDefault('K52.2: Αλλεργική και διαιτητική γαστρεντερίτιδα και κολίτιδα')} />
                        </Col>
                        <Col className="text-start">
                            <label>K52.2: Αλλεργική και διαιτητική γαστρεντερίτιδα και κολίτιδα</label>
                        </Col>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='Z88.7: Ατομικό ιστορικό αλλεργίας σε ορό και εμβόλιο' onChange={changeHandler} defaultChecked={checkDefault('Z88.7: Ατομικό ιστορικό αλλεργίας σε ορό και εμβόλιο')} />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.7: Ατομικό ιστορικό αλλεργίας σε ορό και εμβόλιο</label>

                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='L23: Αλλεργική δερματίτιδα εξ επαφής' onChange={changeHandler} defaultChecked={checkDefault('L23: Αλλεργική δερματίτιδα εξ επαφής')} />
                        </Col>
                        <Col className="text-start">
                            <label>L23: Αλλεργική δερματίτιδα εξ επαφής </label>
                        </Col>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='Z88.8: Ατομικό ιστορικό αλλεργίας σε άλλα φάρμακα, φαρμακευτικές και βιολογικές ουσίες' onChange={changeHandler} defaultChecked={checkDefault('Z88.8: Ατομικό ιστορικό αλλεργίας σε άλλα φάρμακα, φαρμακευτικές και βιολογικές ουσίες')} />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.8: Ατομικό ιστορικό αλλεργίας σε άλλα φάρμακα, φαρμακευτικές και βιολογικές ουσίες</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='L50.0: Αλλεργική κνίδωση' onChange={changeHandler} defaultChecked={checkDefault('L50.0: Αλλεργική κνίδωση')} />
                        </Col>
                        <Col className="text-start">
                            <label>L50.0: Αλλεργική κνίδωση</label>
                        </Col>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' value='Z88.9: Ατομικό ιστορικό αλλεργίας σε μη καθορισμένα φάρμακα, φαρμακευτικές και βιολογικές ουσίες' onChange={changeHandler} defaultChecked={checkDefault('Z88.9: Ατομικό ιστορικό αλλεργίας σε μη καθορισμένα φάρμακα, φαρμακευτικές και βιολογικές ουσίες')} />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.9: Ατομικό ιστορικό αλλεργίας σε μη καθορισμένα φάρμακα, φαρμακευτικές και βιολογικές ουσίες</label>
                        </Col>

                    </Row>
                    {selectedConditionsList.map((condition) => {
                        return (
                            <Row key={uuid()}>
                                <Col className="text-end" xs={1}>
                                    <input type='checkbox' value={`${condition.code}: ${condition.condition}`} onChange={changeHandler} defaultChecked={checkDefault(`${condition.code}: ${condition.condition}`)} />
                                </Col>
                                <Col xs={6}>
                                    <label>{`${condition.code}: ${condition.condition}`}</label>
                                </Col>
                            </Row>
                        );
                    })}
                    <Row>
                        <Col>
                            {addAllergy && <ConditionsFinder add setSelectedCondition={setSelectedCondition} setSelectedConditionsList={setSelectedConditionsList} setAddAllergy={setAddAllergy} />}
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
            </Card>
            {/* </form> */}
        </Container>
    );
};

export default Allergies;