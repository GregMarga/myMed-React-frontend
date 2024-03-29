import { Row, Col } from "react-bootstrap";
import classes from './PatientProfile.module.css';
import profile from './profile.webp';
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { PatientContext } from "../../context/patient-context";
import { useHttpClient } from "../../hooks/http-hook";
import moment from "moment";
import ErrorModal from "../UI/ErrorModal";
import { Link, useParams } from "react-router-dom";

const BasicInfo = (props) => {
    const [loadedBasics, setLoadedBasics] = useState({ name: '', sirname: '', amka: '', diagnosis: '', tel: '', dateOfBirth: '', job: '', gender: '', area: '', address: '', postalCode: '', familyStatus: '', fathersName: '', imageName: null })
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext)
    const { error, clearError, sendRequest } = useHttpClient();
    const params = useParams()


    const fetchPatients = async () => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/basic`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            setLoadedBasics({ name: responseData.name, sirname: responseData.sirname, amka: responseData.amka, dateOfBirth: responseData.dateOfBirth, diagnosis: responseData.diagnosis, tel: responseData.tel, placeOfBirth: responseData.placeOfBirth, address: responseData.address, area: responseData.area, job: responseData.job, fathersName: responseData.fathersName, familyStatus: responseData.familyStatus, gender: responseData.gender, postalCode: responseData.postalCode, email: responseData.email });
            patientContext.changeGender(responseData.gender)
            if (!!responseData.files) {
                setLoadedBasics((prevState) => {
                    return { ...prevState, imageName: responseData.files.split('\\')[2] }
                })
            }

        } catch (err) { }
    }

    useEffect(() => {

        if (patientContext.patientId !== null) {
            fetchPatients()
        }
    }, [sendRequest, patientContext.patientId]);



    return (
        <Fragment>
            {!!error && < ErrorModal onClear={clearError} error={error} />}
            <Row className={classes.basicInfo}>
                <Col md={2} className='text-center'>
                    <div>
                        <label>Όνομα:</label>
                        <span>{loadedBasics.name}</span>
                    </div>
                    <div>
                        <label>Τόπος Γέννησης:</label>
                        <span>{loadedBasics.placeOfBirth}</span>
                    </div>
                    <div>
                        <label>Επάγγελμα:</label>
                        <span>{loadedBasics.job}</span>
                    </div>
                    <div>
                        <label>Τηλέφωνο:</label>
                        <span>{loadedBasics.tel}</span>
                    </div>

                </Col>
                <Col md={3} className='text-center'>
                    <div>
                        <label>Πατρώνυμο:</label>
                        <span>{loadedBasics.fathersName}</span>
                    </div>
                    <div>
                        <label>Ημ/ Γεννήσης:</label>
                        <span>{(!!loadedBasics.dateOfBirth) ? moment(loadedBasics.dateOfBirth).format('DD-MM-YYYY') : ''}</span>
                    </div>
                    <div>
                        <label>Οικογενειακή Κατάσταση:</label>
                        {(loadedBasics.familyStatus === 'married') && <span>Παντρεμμένος/η</span>}
                        {(loadedBasics.familyStatus === 'notmarried') && <span>Ανύπνατρος/η</span>}
                        {(loadedBasics.familyStatus === 'divorced') && <span>Διαζευγμένος/η</span>}

                    </div>
                    <div>
                        <label>E-mail:</label>
                        <span>{loadedBasics.email}</span>
                    </div>
                </Col>
                <Col md={2} className='text-center'>
                    <div>
                        <label>Επώνυμο:</label>
                        <span>{loadedBasics.sirname}</span>
                    </div>
                    <div>
                        <label>Φύλο:</label>
                        <span>{(loadedBasics.gender === 'male') ? 'Άρρεν' : 'Θήλυ'}</span>
                    </div>
                    <div>
                        <label>Περιοχή:</label>
                        <span>{loadedBasics.area}</span>
                    </div>

                </Col>
                <Col md={2} className='text-center'>
                    <div>
                        <label>ΑΜΚΑ:</label>
                        <span>{loadedBasics.amka}</span>
                    </div>
                    <div>
                        <label>Διεύθυνση:</label>
                        <span>{loadedBasics.address}</span>
                    </div>
                    <div>
                        <label>Τ.Κ:</label>
                        <span>{loadedBasics.postalCode}</span>
                    </div>
                    <br/>
                    <br/>
                    <div><button className={classes.editBasicsButton}><Link to={`/patients/${params.patientId}/basics`}> Επεξεργασία</Link></button></div>
                </Col>


                <Col md={3} className='text-end' xs={{ order: 'first' }} sm={{ order: 'last' }}>
                    <span className={classes.profileImage}>
                        <img src={(!!loadedBasics.imageName) ? `${process.env.REACT_APP_BACKEND_URL}/uploads/images/${loadedBasics.imageName}` : profile} />
                    </span>

                </Col>
            </Row >
            
        </Fragment>
    );
}

export default BasicInfo;