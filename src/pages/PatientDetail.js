import { Fragment } from 'react';
import { useParams, Switch, Route } from 'react-router-dom'
import Header from '../components/Header';
import Basic from '../components/Patient-Details-Pages/Basic';
import ClinicalExamination from '../components/Patient-Details-Pages/ClinicalExamination';
import History from '../components/Patient-Details-Pages/History';
import LabAnalysis from '../components/Patient-Details-Pages/LabAnalysis/LabAnalysis';
import Visits from '../components/Patient-Details-Pages/Visits/Visits';
import PatientId from '../components/PatientId';
import classes from './PatientDetail.module.css';
import VisitDetail from '../components/Patient-Details-Pages/Visits/VisitDetail';
// import { PatientContext } from '../context/patient-context';
import { useState,useEffect} from 'react';



const PatientDetail = () => {
    const [loadedPatient, setLoadedPatient] = useState({name:'',sirname:'',age:'',amka:'',fathersName:'',tel:''});
    const params = useParams();
    const patientId = params.patientId;
    useEffect(() => {
        fetch(`http://localhost:5000/patients/${patientId}`
        ).then((response) => {
            return response.json()
        })
            .then((data) => {
                setLoadedPatient(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    return (
        <Fragment>
            <Header patientId={params.patientId} />
            <PatientId  patient={loadedPatient} />
            <h5 className={classes.mytitle}>Τα πεδία με <span>* </span>είναι απαραίτητα</h5>

            <Switch>
                <Route path={`/patients/${params.patientId}/basic`} exact><Basic patient={loadedPatient} patientId={patientId}/></Route>
                <Route path={`/patients/${params.patientId}/anamnistiko`}><History patientId={patientId}/></Route>
                <Route path={`/patients/${params.patientId}/visits`} exact><div><Visits patientId={patientId}/></div></Route>
                <Route path={`/patients/${params.patientId}/clinical`}><ClinicalExamination /></Route>
                <Route path={`/patients/${params.patientId}/lab_test`}><LabAnalysis patientId={patientId}/></Route>
                {/* <Route path={`/patients/62a0e2f4086903904ac8683e/visits/new`}><p>Please Work motherfuckerrrrrrrrrrrrrrrrrrrrr</p></Route> */}
                {/* <Route path={`/patients/${params.patientId}/lab_test/:labId`}><NewLabAnalysis/></Route> */}
                <Route path={`/patients/${params.patientId}/visits/:visitId`}><VisitDetail patientId={params.patientId}/></Route>
            </Switch>
        </Fragment>
    );
};

export default PatientDetail;