import { Row, Col } from "react-bootstrap";
import classes from './PatientProfile.module.css';
import profile from './profile.webp';
import { useContext, useEffect,useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { PatientContext } from "../../context/patient-context";
import { useHttpClient } from "../../hooks/http-hook";
import { useParams } from "react-router-dom";

const BasicInfo = (props) => {
    const [loadedBasics, setLoadedBasics] = useState({ name: '', sirname: '', amka: '', diagnosis: '', tel: '', dateOfBirth: '', job: '', gender: '', area: '', address: '', postalCode: '', familyStatus: '', fathersName: '', imageName: null })
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext)
    const { isLoading, error, clearError, sendRequest } = useHttpClient()


    const fetchPatients = async () => {
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/basic`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            console.log(responseData)
            setLoadedBasics({ name: responseData.name, sirname: responseData.sirname, amka: responseData.amka, dateOfBirth: responseData.dateOfBirth, diagnosis: responseData.diagnosis, tel: responseData.tel, placeOfBirth: responseData.placeOfBirth, address: responseData.address, area: responseData.area, job: responseData.job, fathersName: responseData.fathersName, familyStatus: responseData.familyStatus, gender: responseData.gender, postalCode: responseData.postalCode,email:responseData.email });
            if (!!responseData.files) {
                setLoadedBasics((prevState) => {
                    return { ...prevState, imageName: responseData.files.split('\\')[2] }
                })
            }
            console.log(loadedBasics)
        } catch (err) { }
    }

    useEffect(() => {

        if (patientContext.patientId !== null) {
            fetchPatients()
        }
    }, [sendRequest, patientContext.patientId]);
    


    return (
        <Row className={classes.basicInfo}>
            <Col md={2} className='text-center'>
                <div>
                    <label>Όνομα:</label>
                    <span>{loadedBasics.name}</span>
                </div>
                <div>
                    <label>Τόπος Γέννησης:</label>
                    <span></span>
                </div>
                <div>
                    <label>Επάγγελμα:</label>
                    <span></span>
                </div>
                <div>
                    <label>Τ.Κ:</label>
                    <span></span>
                </div>
            </Col>
            <Col md={2} className='text-center'>
                <div>
                    <label>Πατρώνυμο:</label>
                    <span>{loadedBasics.fathersName}</span>
                </div>
                <div>
                    <label>Ημ/ Γεννήσης:</label>
                    <span>{loadedBasics.dateOfBirth}</span>
                </div>
                <div>
                    <label>Οικογενειακή Κατάσταση:</label>
                    <span></span>
                </div>
                <div>
                    <label>E-mail:</label>
                    <span></span>
                </div>
            </Col>
            <Col md={2} className='text-center'>
                <div>
                    <label>Επώνυμο:</label>
                    <span>{loadedBasics.sirname}</span>
                </div>
                <div>
                    <label>Φύλο:</label>
                    <span></span>
                </div>
                <div>
                    <label>Περιοχή:</label>
                    <span></span>
                </div>
                <div>
                    <label>Τηλέφωνο:</label>
                    <span></span>
                </div>
            </Col>
            <Col md={2} className='text-center'>
                <div>
                    <label>ΑΜΚΑ:</label>
                    <span>{loadedBasics.amka}</span>
                </div>
                <div>
                    <label>Οικογενειακή Κατάσταση:</label>
                    <span></span>
                </div>
                <div>
                    <label>Διεύθυνση:</label>
                    <span></span>
                </div>
            </Col>


            <Col md={3} className='text-end' xs={{ order: 'first' }} sm={{ order: 'last' }}>
                <span className={classes.profileImage}>
                    <img src={(!!loadedBasics.imageName)?`http://localhost:5000/uploads/images/${loadedBasics.imageName}`:profile} />
                </span>

            </Col>
        </Row >
    );
}

export default BasicInfo;