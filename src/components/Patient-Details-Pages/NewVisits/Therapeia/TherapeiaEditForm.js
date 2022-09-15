import { Row, Col } from "react-bootstrap";
import { useState, useRef, Fragment } from "react";
import classes from './TherapeiaForm.module.css';
import { v4 as uuid } from 'uuid';




const TherapeiaEditForm = (props) => {

    const [nameInput, setNameInput] = useState('')


    const posotitaInputRef = useRef();
    const syxnotitaInputRef = useRef();
    const durationInputRef = useRef();

    const changeHandler = (event) => {
        setNameInput(event.target.value)
    }


    const submitHandler = async (event) => {
        event.preventDefault();

        let therapeia = {
            posotita: posotitaInputRef.current.value,
            syxnotita: syxnotitaInputRef.current.value,
            duration: durationInputRef.current.value,
        }

        props.editTherapeiaHandler(therapeia, props.id);
        props.setEditTherapeia(false);
    }

    return (
        <Fragment >
            <form onSubmit={submitHandler}>
                <Row >
                    <Col md={6} className='text-xxl-start'>
                        <label className={classes.myLabels}>Πάθηση</label>
                        <input className={classes.conditionInput} defaultValue={props.condition} list='conditionsNames' name='conditionName' value={nameInput} disabled />

                    </Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <input value={props.drugName} disabled />
                    </Col>
                    <Col className='text-center'>
                        <input value={props.ATC_name} disabled />
                    </Col>
                </Row>
                <Row className={classes.dosologia}>
                    <Col xl={4}>
                        <label>Ποσό Δόσης</label>
                        <select ref={posotitaInputRef} required>
                            <option value="" selected disabled hidden>Επιλέξτε</option>
                            <option selected={props.posotita === '0.25'} value='0.25'>0.25</option>
                            <option selected={props.posotita === '0.5'} value='0.5'>0.5</option>
                            <option selected={props.posotita === '1'} value='1'>1</option>
                            <option selected={props.posotita === '1.5'} value='1.5'>1.5</option>
                            <option selected={props.posotita === '2'} value='2'>2</option>
                            <option selected={props.posotita === '2.5'} value='2.5'>2.5</option>
                            <option selected={props.posotita === '3'} value='3'>3</option>
                            <option selected={props.posotita === '3.5'} value='3.5'>3.5</option>
                            <option selected={props.posotita === '4'} value='4'>4</option>
                            <option selected={props.posotita === '4.5'} value='4.5'>4.5</option>
                            <option selected={props.posotita === '5'} value='5'>5</option>
                            <option selected={props.posotita === '5.5'} value='5.5'>5.5</option>
                            <option selected={props.posotita === '6'} value='6'>6</option>
                            <option selected={props.posotita === '6.5'} value='6.5'>6.5</option>
                            <option selected={props.posotita === '7'} value='7'>7</option>
                            <option selected={props.posotita === '7.5'} value='7.5'>7.5</option>
                            <option selected={props.posotita === '8'} value='8'>8</option>
                            <option selected={props.posotita === '8.5'} value='8.5'>8.5</option>
                            <option selected={props.posotita === '9'} value='9'>9</option>
                            <option selected={props.posotita === '9.5'} value='9.5'>9.5</option>
                            <option selected={props.posotita === '10'} value='10'>10</option>
                            <option selected={props.posotita === '11'} value='11'>11</option>
                            <option selected={props.posotita === '12'} value='12'>12</option>
                            <option selected={props.posotita === '13'} value='13'>13</option>
                            <option selected={props.posotita === '14'} value='14'>14</option>
                            <option selected={props.posotita === '15'} value='15'>15</option>
                            <option selected={props.posotita === '16'} value='16'>16</option>
                            <option selected={props.posotita === '17'} value='17'>17</option>
                            <option selected={props.posotita === '18'} value='18'>18</option>
                            <option selected={props.posotita === '19'} value='19'>19</option>
                            <option selected={props.posotita === '20'} value='20'>20</option>
                            <option selected={props.posotita === '21'} value='21'>21</option>
                            <option selected={props.posotita === '22'} value='22'>22</option>
                            <option selected={props.posotita === '23'} value='23'>23</option>
                            <option selected={props.posotita === '24'} value='24'>24</option>
                            <option selected={props.posotita === '25'} value='25'>25</option>
                            <option selected={props.posotita === '26'} value='26'>26</option>
                            <option selected={props.posotita === '27'} value='27'>27</option>
                            <option selected={props.posotita === '28'} value='28'>28</option>
                            <option selected={props.posotita === '29'} value='29'>29</option>
                            <option selected={props.posotita === '30'} value='30'>30</option>
                            <option selected={props.posotita === '31'} value='31'>31</option>
                            <option selected={props.posotita === '32'} value='32'>32</option>
                            <option selected={props.posotita === '33'} value='33'>33</option>
                            <option selected={props.posotita === '34'} value='34'>34</option>
                            <option selected={props.posotita === '35'} value='35'>35</option>
                            <option selected={props.posotita === '36'} value='36'>36</option>
                            <option selected={props.posotita === '37'} value='37'>37</option>
                            <option selected={props.posotita === '38'} value='38'>38</option>
                            <option selected={props.posotita === '39'} value='39'>39</option>
                            <option selected={props.posotita === '40'} value='40'>40</option>
                        </select>
                    </Col>
                    <Col xl={4}>
                        <label>Συχνότητα</label>
                        <select ref={syxnotitaInputRef} required>
                            <option value="" selected disabled hidden>Επιλέξτε</option>
                            <option selected={props.syxnotita === '1 φορά την ημέρα'} value='1 φορά την ημέρα'>1 φορά την ημέρα</option>
                            <option selected={props.syxnotita === '2 φορές την ημέρα'} value='2 φορές την ημέρα'>2 φορές την ημέρα</option>
                            <option selected={props.syxnotita === '3 φορές την ημέρα'} value='3 φορές την ημέρα'>3 φορές την ημέρα</option>
                            <option selected={props.syxnotita === '4 φορές την ημέρα'} value='4 φορές την ημέρα'>4 φορές την ημέρα</option>
                            <option selected={props.syxnotita === '1 φορά την εβδομάδα'} value='1 φορά την εβδομάδα'>1 φορά την εβδομάδα</option>
                            <option selected={props.syxnotita === '2 φορές την εβδομάδα'} value='2 φορές την εβδομάδα'>2 φορές την εβδομάδα</option>
                            <option selected={props.syxnotita === '3 φορές την εβδομάδα'} value='3 φορές την εβδομάδα'>3 φορές την εβδομάδα</option>
                            <option selected={props.syxnotita === 'εφάπαξ'} value='εφάπαξ'>εφάπαξ</option>
                            <option selected={props.syxnotita === 'επί πόνου'} value='επί πόνου'>επί πόνου</option>
                            <option selected={props.syxnotita === 'κάθε 2 εβδομάδες'} value='κάθε 2 εβδομάδες'>κάθε 2 εβδομάδες</option>
                            <option selected={props.syxnotita === 'επί δύσπνοιας'} value='επί δύσπνοιας'>επί δύσπνοιας</option>
                        </select>

                    </Col>
                    <Col xl={4}>
                        <label>Ημέρες</label>
                        <select ref={durationInputRef}>
                            <option value="" selected disabled hidden>Επιλέξτε</option>
                            <option selected={props.duration === '1 ημέρα'} value='1 ημέρα'>1 ημέρα</option>
                            <option selected={props.duration === '2 ημέρες'} value='2 ημέρες'>2 ημέρες</option>
                            <option selected={props.duration === '3 ημέρες'} value='3 ημέρες'>3 ημέρες</option>
                            <option selected={props.duration === '4 ημέρες'} value='4 ημέρες'>4 ημέρες</option>
                            <option selected={props.duration === '5 ημέρες'} value='5 ημέρες'>5 ημέρες</option>
                            <option selected={props.duration === '6 ημέρες'} value='6 ημέρες'>6 ημέρες</option>
                            <option selected={props.duration === '7 ημέρες'} value='7 ημέρες'>7 ημέρες</option>
                            <option selected={props.duration === '8 ημέρες'} value='8 ημέρες'>8 ημέρες</option>
                            <option selected={props.duration === '9 ημέρες'} value='9 ημέρες'>9 ημέρες</option>
                            <option selected={props.duration === '10 ημέρες'} value='10 ημέρες'>10 ημέρες</option>
                            <option selected={props.duration === '12 ημέρες'} value='12 ημέρες'>12 ημέρες</option>
                            <option selected={props.duration === '13 ημέρες'} value='13 ημέρες'>13 ημέρες</option>
                            <option selected={props.duration === '14 ημέρες'} value='14 ημέρες'>14 ημέρες</option>
                            <option selected={props.duration === '15 ημέρες'} value='15 ημέρες'>15 ημέρες</option>
                            <option selected={props.duration === '16 ημέρες'} value='16 ημέρες'>16 ημέρες</option>
                            <option selected={props.duration === '17 ημέρες'} value='17 ημέρες'>17 ημέρες</option>
                            <option selected={props.duration === '18 ημέρες'} value='18 ημέρες'>18 ημέρες</option>
                            <option selected={props.duration === '19 ημέρες'} value='19 ημέρες'>19 ημέρες</option>
                            <option selected={props.duration === '20 ημέρες'} value='20 ημέρες'>20 ημέρες</option>
                            <option selected={props.duration === '21 ημέρες'} value='21 ημέρες'>21 ημέρες</option>
                            <option selected={props.duration === '22 ημέρες'} value='22 ημέρες'>22 ημέρες</option>
                            <option selected={props.duration === '23 ημέρες'} value='23 ημέρες'>23 ημέρες</option>
                            <option selected={props.duration === '24 ημέρες'} value='24 ημέρες'>24 ημέρες</option>
                            <option selected={props.duration === '25 ημέρες'} value='25 ημέρες'>25 ημέρες</option>
                            <option selected={props.duration === '26 ημέρες'} value='26 ημέρες'>26 ημέρες</option>
                            <option selected={props.duration === '27 ημέρες'} value='27 ημέρες'>27 ημέρες</option>
                            <option selected={props.duration === '28 ημέρες'} value='28 ημέρες'>28 ημέρες</option>
                            <option selected={props.duration === '29 ημέρες'} value='29 ημέρες'>29 ημέρες</option>
                            <option selected={props.duration === '30 ημέρες'} value='30 ημέρες'>30 ημέρες</option>

                        </select>
                        {/* // <input ref={syxnotitaInputRef} required />
                        // <datalist></datalist> */}
                    </Col>


                </Row>
                <Row>
                    <Col xs={4} md={2} className={`text-center ${classes.therapeiaButton}`}>
                        <button type='submit' >Αποθήκευση</button>
                    </Col>
                    <Col xs={4} md={2} className={`text-center ${classes.therapeiaButton}`}>
                        <button type='button' onClick={() => { props.setEditTherapeia(false) }}>Ακύρωση</button>
                    </Col>
                </Row>
            </form>
        </Fragment>
    );
}

export default TherapeiaEditForm;