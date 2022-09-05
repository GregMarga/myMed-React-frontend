import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Pregnacy from './Pregnacy'
import Card from "../../../UI/Card";
import classes from './Gynaikologiko.module.css';


const Gynaikologiko = (props) => {
    const [stability, setStability] = useState(true);
   

    const stabilityChangeHandler = (event) => {
        setStability(event.target.value === 'true')
       
    }


    return (
        <Container>
            <Row><Col className="text-center"><div ><h4>Έμμηνος Ρύση</h4></div></Col></Row>
            <Card className={classes.erCard}>
                <Row>
                    <Col sm lg="2" className='text-end'><label>Εμμηναρχή</label></Col>
                    <Col sm lg="2" className='text-start'><input type='number' placeholder="ηλικία σε έτη" value={props.gynaikologiko.emminarxiInputRef}/></Col>
                </Row>
                <Row>
                    <Col className='text-end'><label>Σταθερότητα</label></Col>
                    <Col>
                        <select name='stability' onChange={stabilityChangeHandler} value={props.gynaikologiko.stabilityInputRef}>
                            <option value={false} selected={!props.gynaikologiko.stabilityInputRef}>ασταθής</option>
                            <option value={true}  selected >σταθερή</option>
                        </select>
                    </Col>
                    <Col className='text-end'><label>Διάρκεια Κύκλου</label></Col>
                    <Col><input type='number' defaultValue={28} disabled={stability === false} value={props.gynaikologiko.cycle_durationInputRef}/></Col>
                    <Col className='text-end'><label>Διάρκεια Περιόδου</label></Col>
                    <Col ><input type='number' value={props.gynaikologiko.period_durationInputRef}/></Col>
                </Row>
                <Row>
                    <Col sm={2} className='text-end'><label>Εμμηνόπαυση</label></Col>
                    <Col sm={2} className='text-start'><input type='number' placeholder="ηλικία σε έτη" value={props.gynaikologiko.emminopausiInputRef}/></Col>
                </Row>
            </Card>
            <Row><Col className="text-center"><div ><h4>Μαιευτικό Ιστορικό</h4></div></Col></Row>

            <Pregnacy pregnacyList={props.pregnacyList} setPregnaciesList={props.setPregnaciesList} />
            <Card className={classes.gynaikologikoCard}>
                <Row>
                    <Col sm={1} className='text-end'><input type='checkbox' value={props.adkInputRef} defaultChecked={props.gynaikologiko.adk}/></Col>
                    <Col sm={3} className='text-start'>Αυτόματη Διακοπή Κύησης</Col>
                </Row>
                <Row>
                    <Col sm={1} className='text-end'><input type='checkbox' value={props.tdkInputRef} defaultChecked={props.gynaikologiko.tdk}/></Col>
                    <Col sm={3} className='text-start'>Τεχνητή Διακοπή Κύησης</Col>
                </Row>
            </Card>
        </Container>
    );
}

export default Gynaikologiko;