import classes from './NewLabAnalysis.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GeneralBlood from './GeneralBlood';
import Thyro from './Thyro';
import Ypofysi from './Ypofysi';
import Parathyro from './Parathyro';

const NewLabAnalysis = (props) => {
    const defaultState={
        blood: false,
        thyro: false,
        parathyro: false,
        ypofysi: false,
        epinefridio: false,
        eggs: false,
        balls: false
      }
    const [labAnalysisType, setLabAnalysisType] = useState({...defaultState,blood:true});
    const [locationKeys, setLocationKeys] = useState([]);
    const history=useHistory();
    useEffect(() => {
        return history.listen((location) => {
          if (history.action === "PUSH") {
            setLocationKeys([location.key]);
          }
    
          if (history.action === "POP") {
            if (locationKeys[1] === location.key) {
              setLocationKeys(([_, ...keys]) => keys);
    
              // Handle forward event
            } else {
              setLocationKeys((keys) => [location.key, ...keys]);
              props.onBack(locationKeys)
    
              // Handle back event
            }
          }
        });
      }, [locationKeys]);
    

   
    function changeHandler(event) {
        const selectValue = event.target.value;

        if (selectValue === 'blood') {
            setLabAnalysisType({
                ...defaultState,blood:true} 
                );}
        if (selectValue === 'thyro') {
            setLabAnalysisType({
                ...defaultState,thyro:true} 
                );}
        if (selectValue === 'parathyro') {
            setLabAnalysisType({
                ...defaultState,parathyro:true} 
                );}
        if (selectValue === 'ypofysi') {
            setLabAnalysisType({
                ...defaultState,ypofysi:true} 
                );}
        if (selectValue === 'epinefridia') {
            setLabAnalysisType({
                ...defaultState,epinefridio:true} 
                );}
        if (selectValue === 'eggs') {
            setLabAnalysisType({
                ...defaultState,eggs:true} 
                );}
        if (selectValue === 'balls') {
            setLabAnalysisType({
                ...defaultState,balls:true} 
                );}
    }
    return (
        <Container  className={classes.mylab}>
            <Row>
                <Col>
                    <label className={classes.myselect}>Επίσκεψη</label>
                    <select>
                        <option>Πρώτη Επίσκεψη</option>
                        <option>Δεύτερη Επίσκεψη</option>
                    </select>
                </Col>

                <Col>
                    <label className={classes.myselect} htmlFor='labifo'>Τύπος Εξέτασης</label>
                    <select onChange={changeHandler} id='labinfo'>
                        <option value='blood'>Γενική Αίματος</option>
                        <option value='thyro'>Θυρεοειδής</option>                        <option value='parathyro'>Παραθυρεοειδής</option>
                        <option value='ypofysi'>Υπόφυση</option>
                        <option value='epinefridia'>Επινεφρίδια</option>
                        <option value='eggs'>Ωοθήκες</option>
                        <option value='balls'>Όρχεις</option>
                    </select>
                </Col>
            </Row>
            <Row>
                {labAnalysisType.blood && <GeneralBlood />}
                {labAnalysisType.thyro && <Thyro />}
                {labAnalysisType.ypofysi && <Ypofysi />}
                {labAnalysisType.parathyro && <Parathyro />}
                {labAnalysisType.epinefridia && <Parathyro />}
            </Row>
        </Container>

    );
}

export default NewLabAnalysis;