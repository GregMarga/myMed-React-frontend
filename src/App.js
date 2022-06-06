import { Route, Switch, Redirect } from 'react-router-dom';
import SideNavigation from './components/SideNavigation';
import Appointments from './pages/Appointments';
import PatientDetail from './pages/PatientDetail';
import Patients from './pages/Patients';
import Auth from './authentication/Auth';

function App() {
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  return (

      <main>
        <Switch>
          <Route path='/' exact>
            <SideNavigation />
            <Redirect to='/patients' />
          </Route>
          <Route path='/patients' exact>
            <SideNavigation />
            <Patients />
          </Route>
          <Route path='/appointments'>
            <SideNavigation />
            <Appointments />
          </Route>
          <Route path='/patients/:patientId' >
            <SideNavigation />
            <PatientDetail />
          </Route>
          <Route path='/auth' >
            <Auth />
          </Route>
        </Switch>
      </main>
  );
}

export default App;
