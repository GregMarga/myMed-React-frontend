import { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import classes from './Basic.module.css';
import SaveButton from '../UI/SaveButton';
import EditFormButton from "../UI/EditFormButton";
import ErrorModal from '../UI/ErrorModal';
import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card";
import ImageUpload from "../UI/ImageUpload";
import { useState, useEffect, useRef, useContext } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import { useForm } from "../../hooks/form-hook";
import { AuthContext } from "../../context/auth-context";
import { PatientContext } from "../../context/patient-context";
import moment from 'moment';
import { useHistory, useParams } from "react-router-dom";


const Basic = (props) => {
    const [loadedBasics, setLoadedBasics] = useState({ name: '', sirname: '', amka: '', diagnosis: '', tel: '', dateOfBirth: '', job: '', gender: '', area: '', address: '', postalCode: '', familyStatus: '', fathersName: '', imageName: null })
    const [editBasics, setEditBasics] = useState(false);


    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    const patientContext = useContext(PatientContext)

    const history = useHistory()
    const params = useParams()

    // useEffect(() => {
    //     console.log(patientContext.gender, patientContext.patientId);
    //     console.log(loadedBasics)
    // }, [patientContext,loadedBasics])
    // console.log(!!patientContext.patientId)
    // useEffect(() => {
    //     if (!!patientContext.patientId) {
    //         setEditBasics(true)
    //         console.log('done')
    //     }
    // }, [patientContext.patientId])

    // console.log(editBasics)


    const [formState, inputHandler] = useForm(
        {
            image: {
                image: undefined
            }
        },
        true
    );

    const sirnameInputRef = useRef();
    const nameInputRef = useRef();
    const fathersNameInputRef = useRef();
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


    const [age, setAge] = useState(null);


    const fetchPatients = async () => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/basic`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            console.log(responseData)
            setLoadedBasics({ name: responseData.name, sirname: responseData.sirname, amka: responseData.amka, dateOfBirth: responseData.dateOfBirth, diagnosis: responseData.diagnosis, tel: responseData.tel, placeOfBirth: responseData.placeOfBirth, address: responseData.address, area: responseData.area, job: responseData.job, fathersName: responseData.fathersName, familyStatus: responseData.familyStatus, gender: responseData.gender, postalCode: responseData.postalCode, email: responseData.email });
            if (!!responseData.files) {
                setLoadedBasics((prevState) => {
                    return { ...prevState, imageName: responseData.files.split('\\')[2] }
                })
            }
            setEditBasics(true)

            setAge(responseData.dateOfBirth);
        } catch (err) { }
    }
    console.log(editBasics)


    useEffect(() => {

        if (patientContext.patientId !== null) {
            fetchPatients()
        }
    }, [sendRequest, patientContext.patientId]);


    const submitHandler = async (event) => {
        event.preventDefault();
        console.log('submit')
        if (!!formState.inputs.image.value) {
            try {
                console.log(amkaInputRef.current.value)
                const formData = new FormData();
                formData.append('image', formState.inputs.image.value);
                formData.append('uid', auth.userId);
                formData.append('name', nameInputRef.current.value)
                formData.append('sirname', sirnameInputRef.current.value)
                formData.append('dateOfBirth', dateOfBirthInputRef.current.value)
                formData.append('amka', amkaInputRef.current.value)
                formData.append('tel', TelInputRef.current.value)
                formData.append('placeOfBirth', placeOfBirthInputRef.current.value)
                formData.append('job', jobInputRef.current.value)
                formData.append('email', emailInputRef.current.value)
                formData.append('familyStatus', familyStatusInputRef.current.value)
                formData.append('gender', genderInputRef.current.value)
                formData.append('address', addressInputRef.current.value)
                formData.append('area', areaInputRef.current.value)
                formData.append('postalCode', postalCodeRef.current.value)
                formData.append('fathersName', fathersNameInputRef.current.value)
                formData.append('patientId', patientContext.patientId)   ////////

                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/new/basic/image`,
                    'POST',
                    formData
                );

                patientContext.createPatientId(responseData.patient._id);
                patientContext.changeGender(responseData.patient.gender);

            }
            catch (err) {
                console.log(err)
            }
        } else {
            try {

                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/new/basic`,
                    'POST',
                    JSON.stringify({
                        uid: auth.userId,
                        name: nameInputRef.current.value,
                        sirname: sirnameInputRef.current.value,
                        dateOfBirth: dateOfBirthInputRef.current.value,
                        amka: amkaInputRef.current.value,
                        tel: TelInputRef.current.value,
                        placeOfBirth: placeOfBirthInputRef.current.value,
                        job: jobInputRef.current.value,
                        email: emailInputRef.current.value,
                        familyStatus: familyStatusInputRef.current.value,
                        gender: genderInputRef.current.value,
                        address: addressInputRef.current.value,
                        area: areaInputRef.current.value,
                        postalCode: postalCodeRef.current.value,
                        fathersName: fathersNameInputRef.current.value,
                        patientId: patientContext.patientId
                    }), {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
                );

                patientContext.createPatientId(responseData.patient._id);
                patientContext.changeGender(responseData.patient.gender);

            }
            catch (err) {
                console.log(err)
            }
        }
        // fetchPatients()
    }

    const updateHandler = async (event) => {
        event.preventDefault();
        if (!!formState.inputs.image.value) {
            try {
                console.log(formState.inputs.image.value)
                const formData = new FormData();
                formData.append('image', formState.inputs.image.value);
                formData.append('uid', auth.userId);
                formData.append('name', nameInputRef.current.value)
                formData.append('sirname', sirnameInputRef.current.value)
                formData.append('dateOfBirth', dateOfBirthInputRef.current.value)
                formData.append('amka', amkaInputRef.current.value)
                formData.append('tel', TelInputRef.current.value)
                formData.append('placeOfBirth', placeOfBirthInputRef.current.value)
                formData.append('job', jobInputRef.current.value)
                formData.append('email', emailInputRef.current.value)
                formData.append('familyStatus', familyStatusInputRef.current.value)
                formData.append('gender', genderInputRef.current.value)
                formData.append('address', addressInputRef.current.value)
                formData.append('area', areaInputRef.current.value)
                formData.append('postalCode', postalCodeRef.current.value)
                formData.append('fathersName', fathersNameInputRef.current.value)
                formData.append('patientId', patientContext.patientId)   ////////
                console.log(formData)

                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/basic/image`,
                    'PATCH',
                    formData
                );

                patientContext.changeGender(responseData.patient.gender);
            }
            catch (err) { }
        } else {
            try {

                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/basic`,
                    'PATCH',
                    JSON.stringify({
                        patientId: patientContext.patientId,
                        name: nameInputRef.current.value,
                        sirname: sirnameInputRef.current.value,
                        dateOfBirth: dateOfBirthInputRef.current.value,
                        amka: amkaInputRef.current.value,
                        tel: TelInputRef.current.value,
                        placeOfBirth: placeOfBirthInputRef.current.value,
                        job: jobInputRef.current.value,
                        email: emailInputRef.current.value,
                        familyStatus: familyStatusInputRef.current.value,
                        gender: genderInputRef.current.value,
                        address: addressInputRef.current.value,
                        area: areaInputRef.current.value,
                        postalCode: postalCodeRef.current.value,
                        fathersName: fathersNameInputRef.current.value,

                    }), {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
                );


                patientContext.changeGender(responseData.patient.gender);
            }
            catch (err) { }
        }
        if (!!props.profil) {
            history.replace(`/patients/${params.patientId}/profile`)
        }
        fetchPatients()

        // if (!error) {
        //     history.replace('/patients/new/basic')
        // }
        // history.replace('/patients/new/anamnistiko')

    }




    return (
        <Fragment>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}


            <Container className={classes.basicsContainer}>
                <form className={classes.basicForm} onSubmit={(!!patientContext.patientId) ? updateHandler : submitHandler}>

                    <Card className={classes.basicsCard}>
                        <Row>
                            <Col className={`text-sm-end ${classes.firstInputs}`} xs={6}>
                                <div><label htmlFor="sirname">Επώνυμο<span>* </span></label>&nbsp;<input id='sirname' type='text' ref={sirnameInputRef} required defaultValue={loadedBasics.sirname} disabled={editBasics} /></div>
                                <div> <label htmlFor="name">Όνομα<span>* </span> &nbsp;</label><input ref={nameInputRef} id='name' type='text' required defaultValue={loadedBasics.name} disabled={editBasics} /></div>
                                <div> <label htmlFor="amka"  >ΑΜΚΑ<span>* </span>&nbsp;</label><input ref={amkaInputRef} name='amka' id='amka' type='text' defaultValue={loadedBasics.amka} required minLength={11} maxLength={11} disabled={editBasics} /></div>
                                <div><label htmlFor="fathers-name">Πατρώνυμο</label>&nbsp;&nbsp;<input ref={fathersNameInputRef} name='fathersName' id='fathers-name' type='text' defaultValue={loadedBasics.fathersName} disabled={editBasics} /></div>
                            </Col>

                            <Col className="text-center">
                                <ImageUpload editBasics={editBasics} center imageSource={(!!loadedBasics.imageName) ? `${process.env.REACT_APP_BACKEND_URL}/uploads/images/${loadedBasics.imageName}` : null} onInput={inputHandler} id='image' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>

                            <Col className='text-sm-end '>
                                <label htmlFor="dateOfBirth">Ημερομηνία Γέννησης</label>
                            </Col>
                            <Col className='text-sm-end '>
                                <input disabled={editBasics} ref={dateOfBirthInputRef} id='dateOfBirth' type='date' name="dateOfBirth" defaultValue={moment(age).format('YYYY-MM-DD')}  />
                            </Col>
                            <Col className='text-sm-end '>
                                <label htmlFor="birth_place" >Τόπος Γεννήσεως</label>
                            </Col>
                            <Col className='text-sm-end '>
                                <input disabled={editBasics} ref={placeOfBirthInputRef} id='birth_place' type='text' name="placeOfBirth" defaultValue={loadedBasics.placeOfBirth} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col className='text-sm-end '>
                                <label htmlFor="tel" >Τηλέφωνο<span>* </span></label>
                            </Col>
                            <Col className='text-sm-end '>
                                <input disabled={editBasics} ref={TelInputRef} name='tel' id='tel' type='text' defaultValue={loadedBasics.tel} required />
                            </Col>
                            <Col className='text-sm-end '>
                                <label htmlFor="job">Επάγγελμα</label>
                            </Col>
                            <Col className='text-sm-end '>
                                <input disabled={editBasics} ref={jobInputRef} name='job' id='job' type='text' defaultValue={loadedBasics.job} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col className='text-sm-end '>
                                <label htmlFor="family_status">Οικογενειακή Κατάσταση</label>
                            </Col>
                            <Col className='text-sm-end '>
                                <select ref={familyStatusInputRef} id='family_status' name='family_status' disabled={editBasics}>
                                    <option value="none" selected disabled hidden>Επιλέξτε</option>
                                    <option value='married' selected={loadedBasics.familyStatus === 'married'} >Παντρεμμένος/η</option>
                                    <option value='notmarried' selected={loadedBasics.familyStatus === 'notmarried'}>Ανύπνατρος/η</option>
                                    <option value='divorced' selected={loadedBasics.familyStatus === 'divorced'}>Διαζευγμένος/η</option>
                                </select>

                            </Col>
                            <Col className='text-sm-end '>
                                <label htmlFor="gender">Φύλο<span>* </span></label>
                            </Col>
                            <Col className='text-start'>
                                <select ref={genderInputRef} name='gender' id='gender' required disabled={editBasics}>
                                    <option value="" selected disabled hidden>Επιλέξτε</option>
                                    <option value='male' selected={loadedBasics.gender === 'male'}>Άρρεν</option>
                                    <option value='female' selected={loadedBasics.gender === 'female'}>Θήλυ</option>

                                </select>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col className='text-sm-end '>
                                <label htmlFor="address">Διεύθυνση</label>
                            </Col>
                            <Col className='text-start'>
                                <input ref={addressInputRef} disabled={editBasics} id='address' type='text' name='address' defaultValue={loadedBasics.address} />
                            </Col>
                            <Col className='text-sm-end '>
                                <label htmlFor="location">Περιοχή</label>
                            </Col>
                            <Col className='text-start'>
                                <input ref={areaInputRef} disabled={editBasics} id='location' name="area" type='text' defaultValue={loadedBasics.area} />
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col className='text-sm-end '>
                                <label htmlFor="postalcode">Τ.Κ</label>
                            </Col>
                            <Col className='text-start'>
                                <input ref={postalCodeRef} disabled={editBasics} id='postalcode' name='postalCode' type='text' defaultValue={loadedBasics.postalCode} />
                            </Col>
                            <Col className='text-sm-end '>
                                <label htmlFor="email">E-mail</label>
                            </Col>
                            <Col className='text-start'>
                                <input ref={emailInputRef} disabled={editBasics} id='email' type='text' name="email" defaultValue={loadedBasics.email} />
                            </Col>

                        </Row>
                        <Row >
                            <Col  >
                                {!editBasics && <SaveButton />}
                                {editBasics && <EditFormButton onClick={() => { setEditBasics(false) }} />}
                            </Col>
                        </Row>
                    </Card>
                </form>
            </Container>


        </Fragment >
    );
};

export default Basic;