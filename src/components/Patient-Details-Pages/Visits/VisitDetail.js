import classes from './VisitDetail.module.css';
import Card from "../../UI/Card";
import { Container, Row, Col } from 'react-bootstrap';
import BMI from './BMI';
import { useState } from 'react';

const VisitDetail = (props) => {
    const [bmiParams,setBmiParams]=useState({
        weight:1,
        height:1
    }
    );
    function changeHeightHandler(event){
        setBmiParams({
            ...bmiParams,
            height:event.target.value});
    }
    function changeWeightHandler(event){
        setBmiParams({
            ...bmiParams,
            weight:event.target.value});
    }
    return (
        <Container fluid className={classes.visitDetail}>
            <Card className={classes.cardsVisitDetail}>
                <Row className={` justify-content-md-start`}>
                    <Col className={classes.label} lg='2'><h5>Στοιχεία Επίσκεψης</h5></Col>

                    <Col className={classes.label} lg='2'><h5>Εργαστηριακές</h5></Col>
                </Row>
                <Row>
                    <Col>
                        <label>Διάγνωση</label>
                        <input className={classes.fullSize} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Ημερομηνία*</label>
                        <input type='date' required/>
                    </Col>
                </Row>


                <Row className="justify-content-center"><Col md='10' className='text-center'><h4>Αντικειμενική Εξέταση</h4></Col></Row>

                <Row>
                    <Col>
                        <label>Γενική εικόνα</label>
                        <input className={classes.fullSize} />
                    </Col>
                </Row>
                <Row className={classes.multiInputs}>
                    <Col><label >Αρτηριακή πίεση</label><input /></Col>
                    <Col ><label >Σφύξεις</label><input /></Col>


                </Row>
                <Row className="justify-content-start">
                    <Col lg='3'><label >Βάρος</label> <input onChange={changeWeightHandler}/></Col>
                    <Col lg='3'><label >Ύψος</label> <input onChange={changeHeightHandler}/></Col>
                    <Col lg='3' className={classes.readOnly}><BMI height={bmiParams.height} weight={bmiParams.weight}/></Col>
                    {/* <Col lg='3'><label >ΒΜΙ</label> <input /></Col> */}

                </Row>
                <Row>
                    <Col> <span className={classes.subtitle}>Γεννετικά Όργανα</span></Col>
                </Row>
                <Row>
                    <Col>
                        <label>Τριχοφυΐα Εφηβαίου Κατά Tanner</label>
                        <select >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Στάδιο Μαστών Κατά Tanner</label>
                        <select >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col><label>Όγκος Όρχεων(ml)</label><input /></Col>
                </Row>
                <Row>
                    
                </Row>
                <Row className="justify-content-center"><Col md='10' className='text-center'><h2> </h2></Col></Row>
                <Row >
                    <Col sm='1' className='text-md-end'>
                        <label htmlFor="others">Άλλα</label>
                    </Col>
                    <Col   sm='6'>
                        <textarea id='others' rows='4' />
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default VisitDetail;