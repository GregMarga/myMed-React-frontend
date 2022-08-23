import { Fragment } from 'react';
import { useParams, Switch, Route } from 'react-router-dom'
import Header from '../components/Header';
import Basic from '../components/Patient-Details-Pages/Basic';
import Farmaka from '../components/Patient-Details-Pages/Farmaka/Farmaka';
import ClinicalExamination from '../components/Patient-Details-Pages/ClinicalExamination';
import History from '../components/Patient-Details-Pages/History/History';
import LabAnalysis from '../components/Patient-Details-Pages/LabAnalysis/LabAnalysis';
import Visits from '../components/Patient-Details-Pages/Visits/Visits';
import PatientId from '../components/PatientId';
import classes from './PatientDetail.module.css';
import VisitDetail from '../components/Patient-Details-Pages/Visits/VisitDetail';
import FileEdit from '../components/Patient-Details-Pages/files/FileEdit';
import { AuthContext } from '../context/auth-context';
import { useHttpClient } from '../hooks/http-hook';
import ErrorModal from '../components/UI/ErrorModal';
import NewLabAnalysis from '../components/Patient-Details-Pages/LabAnalysis/NewLabAnalysis';
import Files from '../components/Patient-Details-Pages/NewFiles/Files';
import { useState, useEffect, useContext } from 'react';
import NewVisit from '../components/Patient-Details-Pages/Visits/NewVisit';


const PatientDetail = () => {
    const [loadedPatient, setLoadedPatient] = useState({ name: '', sirname: '', age: '', amka: '', fathersName: '', tel: '' });
    const params = useParams();
    const patientId = params.patientId;
    const auth = useContext(AuthContext);
    const { error, clearError, sendRequest } = useHttpClient();


    // useEffect(() => {
    //     const fetchPatients = async () => {
    //         try {
    //             const responseData = await sendRequest(`http://localhost:5000/patients/${patientId}`, 'GET', null, {
    //                 Authorization: 'Bearer ' + auth.token
    //             });
    //             setLoadedPatient(responseData);
    //         } catch (err) { }

    //     };
    //     fetchPatients();
    // }, [sendRequest]);


    return (
        <Fragment>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            {/* <Header patientId={params.patientId} /> */}
            {/* <PatientId patient={loadedPatient} /> */}
            {/* <h5 className={classes.mytitle}>Τα πεδία με <span>* </span>είναι απαραίτητα</h5> */}

            <Switch>
                <Route path={`/patients/${params.patientId}/basic`} exact><Basic patient={loadedPatient} patientId={patientId} /></Route>
                <Route path={`/patients/${params.patientId}/anamnistiko`}><History patientId={patientId} /></Route>
                <Route path={`/patients/${params.patientId}/farmaka`}><Farmaka /></Route>
                <Route path={`/patients/${params.patientId}/visits`} exact><div><NewVisit /></div></Route>
                {/* <Route path={`/patients/${params.patientId}/visits`} exact><div><Visits patientId={patientId} /></div></Route> */}
                <Route path={`/patients/${params.patientId}/clinical`}><ClinicalExamination /></Route>
                <Route path={`/patients/${params.patientId}/lab_test`} exact><LabAnalysis patientId={patientId} /></Route>
                <Route path={`/patients/${params.patientId}/aad`} exact><Files patientId={patientId} /></Route>
                <Route path={`/patients/${params.patientId}/aad/:fileId`} ><FileEdit patientId={patientId} /></Route>
                <Route path={`/patients/${params.patientId}/lab_test/:type/:labId`}><NewLabAnalysis patientId={params.patientId} /></Route>
                <Route path={`/patients/${params.patientId}/lab_test/:labId`}><NewLabAnalysis patientId={params.patientId} /></Route>
                <Route path={`/patients/${params.patientId}/visits/:visitId`}><VisitDetail patientId={params.patientId} /></Route>
            </Switch>
        </Fragment>
    );
};

export default PatientDetail;