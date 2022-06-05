import { Route, Switch, Redirect } from 'react-router-dom';
import SideNavigation from './components/SideNavigation';
import Appointments from './pages/Appointments';
import PatientDetail from './pages/PatientDetail';
import Patients from './pages/Patients';

function App() {
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  return (
    <div>
      <SideNavigation />
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/patients' />
          </Route>
          <Route path='/patients' exact>
            <Patients />
          </Route>
          <Route path='/appointments'>
            <Appointments />
          </Route>
          <Route path='/patients/:patientId' >
            <PatientDetail />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
