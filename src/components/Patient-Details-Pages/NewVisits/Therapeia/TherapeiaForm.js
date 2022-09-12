import { Row, Col } from "react-bootstrap";
import { useState, useRef, Fragment } from "react";
import FarmakoFinder from "../../Farmaka/FarmakoFinder";
import classes from './TherapeiaForm.module.css';
import { v4 as uuid } from 'uuid';




const TherapeiaForm = (props) => {
    const [selectedFarmako, setSelectedFarmako] = useState({ name: '', ATC_name: '' });
    const [nameInput, setNameInput] = useState('')

    const conditionInputRef = useRef();
    const posotitaInputRef = useRef();
    const syxnotitaInputRef = useRef();
    const durationInputRef = useRef();

    const changeHandler = (event) => {
        setNameInput(event.target.value)
    }


    const submitHandler = async (event) => {
        event.preventDefault();

        let therapeia = {
            condition: conditionInputRef.current.value,
            name: selectedFarmako.name,
            ATC_name: selectedFarmako.ATC_name,
            posotita: posotitaInputRef.current.value,
            syxnotita: syxnotitaInputRef.current.value,
            duration: durationInputRef.current.value,
        }

        props.addTherapeiaHandler(therapeia);
        props.setAddTherapeia(false);
    }

    return (
        <Fragment >
            <form onSubmit={submitHandler}>
                <Row >
                    <Col md={6} className='text-xxl-start'>
                        <label className={classes.myLabels}>Πάθηση</label>
                        <input className={classes.conditionInput} list='conditionsNames' name='conditionName' ref={conditionInputRef} value={nameInput} onChange={changeHandler} required />
                        <datalist id='conditionsNames'>
                            {props.diagnosisList.map((diagnosis) => {
                                return <option value={diagnosis.name} key={uuid()} />
                            })}
                        </datalist>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <FarmakoFinder therapeia setSelectedFarmako={setSelectedFarmako} />
                    </Col>
                </Row>
                <Row className={classes.dosologia}>
                    <Col xl={4}>
                        <label>Ποσό Δόσης</label>
                        <select ref={posotitaInputRef} required>
                            <option value="" selected disabled hidden>Επιλέξτε</option>
                            <option value='0.25'>0.25</option>
                            <option value='0.5'>0.5</option>
                            <option value='1'>1</option>
                            <option value='1'>1.5</option>
                            <option value='2'>2</option>
                            <option value='2.5'>2.5</option>
                            <option value='3'>3</option>
                            <option value='3.5'>3.5</option>
                            <option value='4'>4</option>
                            <option value='4.5'>4.5</option>
                            <option value='5'>5</option>
                            <option value='5.5'>5.5</option>
                            <option value='6'>6</option>
                            <option value='6.5'>6.5</option>
                            <option value='7'>7</option>
                            <option value='7.5'>7.5</option>
                            <option value='8'>8</option>
                            <option value='8.5'>8.5</option>
                            <option value='9'>9</option>
                            <option value='9.5'>9.5</option>
                            <option value='10'>10</option>
                            <option value='11'>11</option>
                            <option value='12'>12</option>
                            <option value='13'>13</option>
                            <option value='14'>14</option>
                            <option value='15'>15</option>
                            <option value='16'>16</option>
                            <option value='17'>17</option>
                            <option value='18'>18</option>
                            <option value='19'>19</option>
                            <option value='20'>20</option>
                            <option value='21'>21</option>
                            <option value='22'>22</option>
                            <option value='23'>23</option>
                            <option value='24'>24</option>
                            <option value='25'>25</option>
                            <option value='26'>26</option>
                            <option value='27'>27</option>
                            <option value='9'>28</option>
                            <option value='29'>29</option>
                            <option value='30'>30</option>
                            <option value='31'>31</option>
                            <option value='32'>32</option>
                            <option value='33'>33</option>
                            <option value='34'>34</option>
                            <option value='35'>35</option>
                            <option value='36'>36</option>
                            <option value='37'>37</option>
                            <option value='38'>38</option>
                            <option value='39'>39</option>
                            <option value='40'>40</option>
                        </select>
                    </Col>
                    <Col xl={4}>
                        <label>Συχνότητα</label>
                        <select ref={syxnotitaInputRef} required>
                            <option value="" selected disabled hidden>Επιλέξτε</option>
                            <option value='1 φορά την ημέρα'>1 φορά την ημέρα</option>
                            <option value='2 φορές την ημέρα'>2 φορές την ημέρα</option>
                            <option value='3 φορές την ημέρα'>3 φορές την ημέρα</option>
                            <option value='4 φορές την ημέρα'>4 φορές την ημέρα</option>
                            <option value='1 φορά την εβδομάδα'>1 φορά την εβδομάδα</option>
                            <option value='2 φορές την εβδομάδα'>2 φορές την εβδομάδα</option>
                            <option value='3 φορές την εβδομάδα'>3 φορές την εβδομάδα</option>
                            <option value='εφάπαξ'>εφάπαξ</option>
                            <option value='επί πόνου'>επί πόνου</option>
                            <option value='κάθε 2 εβδομάδες'>κάθε 2 εβδομάδες</option>
                            <option value='επί δύσπνοιας'>επί δύσπνοιας</option>
                        </select>
                        {/* // <input ref={syxnotitaInputRef} required />
                        // <datalist></datalist> */}
                    </Col>
                    <Col xl={4}>
                        <label>Ημέρες</label>
                        <select ref={durationInputRef}>
                            <option value="" selected disabled hidden>Επιλέξτε</option>
                            <option value='1 ημέρα'>1 ημέρα</option>
                            <option value='2 ημέρες'>2 ημέρες</option>
                            <option value='3 ημέρες'>3 ημέρες</option>
                            <option value='4 ημέρες'>4 ημέρες</option>
                            <option value='5 ημέρες'>5 ημέρες</option>
                            <option value='6 ημέρες'>6 ημέρες</option>
                            <option value='7 ημέρες'>7 ημέρες</option>
                            <option value='8 ημέρες'>8 ημέρες</option>
                            <option value='9 ημέρες'>9 ημέρες</option>
                            <option value='10 ημέρες'>10 ημέρες</option>
                            <option value='11 ημέρες'>11 ημέρες</option>
                            <option value='12 ημέρες'>12 ημέρες</option>
                            <option value='13 ημέρες'>13 ημέρες</option>
                            <option value='14 ημέρες'>14 ημέρες</option>
                            <option value='15 ημέρες'>15 ημέρες</option>
                            <option value='16 ημέρες'>16 ημέρες</option>
                            <option value='17 ημέρες'>17 ημέρες</option>
                            <option value='18 ημέρες'>18 ημέρες</option>
                            <option value='19 ημέρες'>19 ημέρες</option>
                            <option value='20 ημέρες'>20 ημέρες</option>
                            <option value='21 ημέρες'>21 ημέρες</option>
                            <option value='22 ημέρες'>22 ημέρες</option>
                            <option value='23 ημέρες'>23 ημέρες</option>
                            <option value='24 ημέρες'>24 ημέρες</option>
                            <option value='25 ημέρες'>25 ημέρες</option>
                            <option value='26 ημέρες'>26 ημέρες</option>
                            <option value='27 ημέρες'>27 ημέρες</option>
                            <option value='28 ημέρες'>28 ημέρες</option>
                            <option value='29 ημέρες'>29 ημέρες</option>
                            <option value='30 ημέρες'>30 ημέρες</option>

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
                        <button type='button' onClick={() => { props.setAddTherapeia(false) }}>Ακύρωση</button>
                    </Col>
                </Row>
            </form>
        </Fragment>
    );
}

export default TherapeiaForm;