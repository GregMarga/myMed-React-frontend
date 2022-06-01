import { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import classes from './Basic.module.css';



const Basic = () => {
    return (
        <Fragment>

            <form className={classes.basicForm}>

                <Container >

                    <Row className='justify-content-center '>
                        <Col className='text-sm-end '>
                            <label htmlFor="sirname">Επώνυμο<span>* </span></label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input id='sirname' type='text' required />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="name">Όνομα<span>* </span></label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input id='name' type='text' required />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="fathers-name">Πατρώνυμο</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input id='fathers-name' type='text' />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="age">Έτος Γεννήσεως</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input id='age' type='text' />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="birth_place">Τόπος Γεννήσεως</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input id='birth_place' type='text' />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="amka">ΑΜΚΑ</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input id='amka' type='text' />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="tel">Τηλέφωνο<span>* </span></label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input id='tel' type='text' required />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="job">Επάγγελμα</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input id='job' type='text' />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="family_status">Οικογενειακή Κατάσταση</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <select id='family_status' name='family_status'>
                                <option value='married'>Παντρεμμένος/η</option>
                                <option value='notmarried'>Ανύπνατρος/η</option>
                                <option value='divorced'>Χωρισμένος/η</option>
                            </select>
                            {/* <input id='family_status' type='text' /> */}
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="gender">Φύλο</label>
                        </Col>
                        <Col className='text-start'>
                            <select name='gender' id='gender'>
                                <option value='male'>Άρρεν</option>
                                <option value='female'>Θήλυ</option>
                                <option value='other'>Άλλο</option>
                            </select>
                            {/* <input id='gender' type='text' /> */}
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="address">Διεύθυνση</label>
                        </Col>
                        <Col className='text-start'>
                            <input id='address' type='text' />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="location">Περιοχή</label>
                        </Col>
                        <Col className='text-start'>
                            <input id='location' type='text' />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="postalcode">Τ.Κ</label>
                        </Col>
                        <Col className='text-start'>
                            <input id='postalcode' type='text' />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="email">E-mail</label>
                        </Col>
                        <Col className='text-start'>
                            <input id='email' type='text' />
                        </Col>
                    </Row>


                </Container>
            </form>


        </Fragment>
    );
};

export default Basic;