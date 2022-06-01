import { Fragment } from 'react';
import { useParams,Switch,Route } from 'react-router-dom'
import Header from '../components/Header';
import Basic from '../components/Patient-Details-Pages/Basic';
import ClinicalExamination from '../components/Patient-Details-Pages/ClinicalExamination';
import History from '../components/Patient-Details-Pages/History';
import LabAnalysis from '../components/Patient-Details-Pages/LabAnalysis/LabAnalysis';
import Visits from '../components/Patient-Details-Pages/Visits/Visits';
import PatientId from '../components/PatientId';
import classes from './PatientDetail.module.css';
import VisitDetail from '../components/Patient-Details-Pages/Visits/VisitDetail';


const PatientDetail = (props) => {
    const params = useParams();
    
    return (
        <Fragment>
            <Header patientId={params.patientId} />
            <PatientId id={params.patientId} patients={props.patients}/>
            <h5 className={classes.mytitle}>Τα πεδία με <span>* </span>είναι απαραίτητα</h5>
            
            <Switch>
                <Route path={`/patients/${params.patientId}/basic`} exact><Basic /></Route>
                <Route path={`/patients/${params.patientId}/anamnistiko`}><History/></Route>
                <Route path={`/patients/${params.patientId}/visits`} exact><div><Visits/></div></Route>
                <Route path={`/patients/${params.patientId}/clinical`}><ClinicalExamination/></Route>
                <Route path={`/patients/${params.patientId}/lab_test`}><LabAnalysis/></Route>
                {/* <Route path={`/patients/${params.patientId}/lab_test/:labId`}><NewLabAnalysis/></Route> */}
                <Route path={`/patients/${params.patientId}/visits/:visitId`}><VisitDetail/></Route>
            </Switch>
        </Fragment>
    );
};

export default PatientDetail;