import { Container, Row, Col } from "react-bootstrap";
import classes from './Allergies.module.css'
import Card from "../../../../UI/Card";

const Allergies = () => {
    return (
        <Container>
            <Row><Col className="text-center"><div className={classes.title}><h4>Αλλεργίες</h4></div></Col></Row>
            {/* <form className={classes.allergiesForm}> */}
                <Card>
                    <Row className="justify-content-space-around">
                        <Col xs={1}></Col>
                        <Col xs={5}><h5>Γενικές αλλεργία</h5></Col>
                        <Col xs={1}></Col>
                        <Col xs={5}><h5>Αλλεργίες σε Φάρμακα</h5></Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>Τ78.4: Αλλεργία,μη καθορισμένη</label>
                        </Col>
                        <Col xs={1} className='text-end'>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>Ζ88.1: Ατομικό ιστορικό αλλεργίας στην πενικιλίνη</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>J30.1: Αλλεργική ρινίτιδα που οφείλεται στη γύρη</label>
                        </Col>

                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.2: Ατομικό ιστορικό αλλεργίας σε άλλους αντιβιοτικούς παράγοντες</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>J30.2:  Άλλη εποχική αλλεργική ρινίτιδα</label>
                        </Col>

                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.3: Ατομικό ιστορικό αλλεργίας στις σουλφοναμίδες</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>J30.3: Άλλη αλλεργική ρινίτιδα</label>
                        </Col>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.4: Ατομικό ιστορικό αλλεργίας σε άλλους παράγοντες κατά των λοιμώξεων</label>

                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start" >
                            <label>J30.4: Αλλεργική ρινίτιδα, μη καθορισμένη</label>
                        </Col>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.5: Ατομικό ιστορικό αλλεργίας σε αναισθητικό παράγοντα</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>J45: Κυρίως αλλεργικό άσθμα</label>
                        </Col>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.6: Ατομικό ιστορικό αλλεργίας σε ναρκωτικό παράγοντα</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>K52.2: Αλλεργική και διαιτητική γαστρεντερίτιδα και κολίτιδα</label>
                        </Col>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.7: Ατομικό ιστορικό αλλεργίας σε ορό και εμβόλιο</label>

                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>L23: Αλλεργική δερματίτιδα εξ επαφής </label>
                        </Col>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.8: Ατομικό ιστορικό αλλεργίας σε άλλα φάρμακα, φαρμακευτικές και βιολογικές ουσίες</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>L50.0: Αλλεργική κνίδωση</label>
                        </Col>
                        <Col className="text-end" xs={1}>
                            <input type='checkbox' />
                        </Col>
                        <Col className="text-start">
                            <label>Z88.9: Ατομικό ιστορικό αλλεργίας σε μη καθορισμένα φάρμακα, φαρμακευτικές και βιολογικές ουσίες</label>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col><label>Άλλα</label><input type='text'/></Col>
                    </Row> */}
                </Card>
            {/* </form> */}
        </Container>
    );
};

export default Allergies;