import { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import classes from './Basic.module.css';
import SaveButton from '../UI/SaveButton';
// import ErrorModal from '../components/UI/ErrorModal';
import LoadingSpinner from "../UI/LoadingSpinner";
import { useState, useEffect, useRef } from 'react';
import { useHttpClient } from '../../hooks/http-hook';



const Basic = (props) => {

    const [loadedBasics, setLoadedBasics] = useState({ dateOfBirth: '', job: '', gender: 'male', area: '', address: '', postalCode: '', familyStatus: 'married' })

    const { isLoading,error, sendRequest, clearError } = useHttpClient();

    const sirnameInputRef = useRef();
    const nameInputRef = useRef();
    const fathersNameInputRef = useRef();
    const AgeInputRef = useRef();
    const TelInputRef = useRef();
    const amkaInputRef = useRef();

    const dateOfBirthInputRef = useRef();
    const placeOfBirthInputRef = useRef();
    const jobInputRef = useRef();
    const familyStatusInputRef = useRef();
    const genderInputRef = useRef();
    const addressInputRef = useRef();
    const areaInputRef = useRef();
    const postalCodeRef = useRef();
    const emailInputRef = useRef();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/basic`);
                setLoadedBasics({ placeOfBirth: responseData.placeOfBirth, address: responseData.address, area: responseData.area, job: responseData.job, familyStatus: responseData.familyStatus, gender: responseData.gender, postalCode: responseData.postalCode });
            } catch (err) { }

        };
        fetchPatients();
    }, []);



    const submitHandler = async (event) => {
        event.preventDefault();
        console.log(placeOfBirthInputRef.current.value)
        try {
            await sendRequest(`http://localhost:5000/patients/${props.patientId}`, 'PATCH',
                JSON.stringify({
                    name: nameInputRef.current.value,
                    sirname: sirnameInputRef.current.value,
                    fathersName: fathersNameInputRef.current.value,
                    age: AgeInputRef.current.value,
                    amka: amkaInputRef.current.value,
                    tel: TelInputRef.current.value
                }), {
                'Content-Type': 'application/json'
            });
        } catch (err) { }

        try {
            await sendRequest(`http://localhost:5000/patients/${props.patientId}/basic`, 'POST',
                JSON.stringify({
                    placeOfBirth: placeOfBirthInputRef.current.value,
                    job: jobInputRef.current.value,
                    familyStatus: familyStatusInputRef.current.value,
                    gender: genderInputRef.current.value,
                    address: addressInputRef.current.value,
                    area: areaInputRef.current.value,
                    postalCode: postalCodeRef.current.value,

                }), {
                'Content-Type': 'application/json'
            });
        } catch (err) { }
    }


    return (
        <Fragment>

            {isLoading&&<LoadingSpinner asOverlay/>}

            {!isLoading &&<form className={classes.basicForm} onSubmit={submitHandler}>

                <Container >

                    <Row className='justify-content-center '>
                        <Col className='text-sm-end '>
                            <label htmlFor="sirname">Επώνυμο<span>* </span></label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input id='sirname' type='text' ref={sirnameInputRef} required defaultValue={props.patient.sirname} />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="name">Όνομα<span>* </span></label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={nameInputRef} id='name' type='text' required defaultValue={props.patient.name} />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="fathers-name">Πατρώνυμο</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={fathersNameInputRef} name='fathersName' id='fathers-name' type='text' defaultValue={props.patient.fathersName} />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="age">Έτος Γεννήσεως</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={AgeInputRef} id='age' type='text' name="age" defaultValue={props.patient.age} />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="birth_place" >Τόπος Γεννήσεως</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={placeOfBirthInputRef} id='birth_place' type='text' name="placeOfBirth" defaultValue={loadedBasics.placeOfBirth} />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="amka"  >ΑΜΚΑ</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={amkaInputRef} name='amka' id='amka' type='text' defaultValue={props.patient.amka} />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="tel" >Τηλέφωνο<span>* </span></label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={TelInputRef} name='tel' id='tel' type='text' defaultValue={props.patient.tel} required />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="job">Επάγγελμα</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <input ref={jobInputRef} name='job' id='job' type='text' defaultValue={loadedBasics.job} />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="family_status">Οικογενειακή Κατάσταση</label>
                        </Col>
                        <Col className='text-sm-end '>
                            <select ref={familyStatusInputRef} id='family_status' name='family_status'>
                                <option value="none" selected disabled hidden>Select an Option</option>
                                <option value='married'selected={loadedBasics.familyStatus ==='married'} >Παντρεμμένος/η</option>
                                <option value='notmarried'selected={loadedBasics.familyStatus ==='notmarried'}>Ανύπνατρος/η</option>
                                <option value='divorced' selected={loadedBasics.familyStatus ==='divorced'}>Διαζευγμένος/η</option>
                            </select>
                            {/* <input id='family_status' type='text' /> */}
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="gender">Φύλο</label>
                        </Col>
                        <Col className='text-start'>
                            <select ref={genderInputRef} name='gender' id='gender'  >
                                <option value="none" selected disabled hidden>Select an Option</option>
                                <option value='male'selected={loadedBasics.gender ==='male'}>Άρρεν</option>
                                <option value='female' selected={loadedBasics.gender ==='female'}>Θήλυ</option>
                                <option value='other' selected={loadedBasics.gender ==='other'}>Άλλο</option>
                            </select>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="address">Διεύθυνση</label>
                        </Col>
                        <Col className='text-start'>
                            <input ref={addressInputRef} id='address' type='text' name='address' defaultValue={loadedBasics.address} />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="location">Περιοχή</label>
                        </Col>
                        <Col className='text-start'>
                            <input ref={areaInputRef} id='location' name="area" type='text' defaultValue={loadedBasics.area} />
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col className='text-sm-end '>
                            <label htmlFor="postalcode">Τ.Κ</label>
                        </Col>
                        <Col className='text-start'>
                            <input ref={postalCodeRef} id='postalcode' name='postalCode' type='text' defaultValue={loadedBasics.postalCode} />
                        </Col>
                        <Col className='text-sm-end '>
                            <label htmlFor="email">E-mail</label>
                        </Col>
                        <Col className='text-start'>
                            <input ref={emailInputRef} id='email' type='text' name="email" />
                        </Col>
                    </Row>
                    <Row >
                        <Col  ><SaveButton /></Col>
                    </Row>



                </Container>
            </form>}


        </Fragment>
    );
};

export default Basic;