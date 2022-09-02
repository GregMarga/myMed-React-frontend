import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef, Fragment, useContext, useEffect } from "react";
import FarmakoFinder from "../../Farmaka/FarmakoFinder";
import classes from './TherapeiaForm.module.css';
import { v4 as uuid } from 'uuid';
import { AuthContext } from "../../../../context/auth-context";
import { useHttpClient } from "../../../../hooks/http-hook";



const TherapeiaForm = (props) => {
    const auth = useContext(AuthContext);
    const { error, sendRequest } = useHttpClient();
    const [selectedFarmako, setSelectedFarmako] = useState({ name: '', ATC_name: '' });
    const [nameInput, setNameInput] = useState('')
    const [allowSave, setAllowSave] = useState(false);


    const conditionInputRef = useRef();
    const posotitaInputRef = useRef();
    const syxnotitaInputRef = useRef();

    const changeHandler = (event) => {
        setNameInput(event.target.value)
    }
    useEffect(() => {
        if (nameInput !== '' && selectedFarmako.name != '') {
            setAllowSave(true)
        } else {
            setAllowSave(false)
        }
    }, [selectedFarmako,nameInput])

    const submitHandler = async (event) => {
        const responseData = await sendRequest(`http://localhost:5000/patients/630ce238394ce3043ab038c8/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });

        let therapeia = {
            condition: conditionInputRef.current.value,
            name: selectedFarmako.name,
            ATC_name: selectedFarmako.ATC_name,
            posotita: posotitaInputRef.current.value,
            syxnotita: syxnotitaInputRef.current.value,
            _id: responseData
        }
        console.log(therapeia)
        props.addTherapeiaHandler(therapeia);
        props.setAddTherapeia(false);
    }

    return (
        <Fragment >
            <Row >
                <Col md={6} className='text-xxl-start'>
                    <label className={classes.myLabels}>Πάθηση</label>
                    <input className={classes.conditionInput} list='conditionsNames' name='conditionName' ref={conditionInputRef} value={nameInput} onChange={changeHandler} />
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
                    <label>Ποσότητα</label>
                    <input ref={posotitaInputRef} />
                    <datalist></datalist>
                </Col>
                <Col xl={4}>
                    <label>Συχνότητα</label>
                    <input ref={syxnotitaInputRef} />
                    <datalist></datalist>
                </Col>


            </Row>
            <Row>
                <Col xs={4} md={2} className={`text-center ${classes.therapeiaButton}`}>
                    {allowSave && <button type='button' onClick={submitHandler}>Αποθήκευση</button>}
                </Col>
                <Col xs={4} md={2} className={`text-center ${classes.therapeiaButton}`}>
                    <button type='button' onClick={() => { props.setAddTherapeia(false) }}>Ακύρωση</button>
                </Col>
            </Row>
        </Fragment>
    );
}

export default TherapeiaForm;