import { Fragment } from 'react';
import { useParams, Switch, Route } from 'react-router-dom'
import Basic from '../components/Patient-Details-Pages/Basic';
import Farmaka from '../components/Patient-Details-Pages/Farmaka/Farmaka';
import ClinicalExamination from '../components/Patient-Details-Pages/ClinicalExamination';
import History from '../components/Patient-Details-Pages/History/History';
import Files from '../components/Patient-Details-Pages/NewFiles/Files';
import Visit from '../components/Patient-Details-Pages/NewVisits/Visit';


const PatientDetail = () => {
    const params = useParams();
    const patientId = params.patientId;


    return (
        <Fragment>

            <Switch>
                <Route path={`/patients/:patientId/basic`} exact><Basic patientId={patientId} /></Route>
                <Route path={`/patients/:patientId/anamnistiko`}><History patientId={patientId} /></Route>
                <Route path={`/patients/:patientId/farmaka`}><Farmaka /></Route>
                <Route path={`/patients/:patientId/visits`} exact><div><Visit /></div></Route>
                <Route path={`/patients/:patientId/visits/:visitId`} exact><div><Visit /></div></Route>

                <Route path={`/patients/:patientId/clinical`}><ClinicalExamination /></Route>
                <Route path={`/patients/:patientId/aad`} exact><Files patientId={patientId} /></Route>
            </Switch>
        </Fragment>
    );
};

export default PatientDetail;