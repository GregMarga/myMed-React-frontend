import { Route, Switch, Redirect } from 'react-router-dom';
import SideNavigation from './components/SideNavigation';
import Appointments from './pages/Appointments';
import PatientDetail from './pages/PatientDetail';
import Patients from './pages/Patients';
import { useState, useEffect } from 'react';

function App() {
  const [loadedPatients, setLoadedPatients] = useState([]);
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


  useEffect(() => {
    fetch("http://localhost:5000/patients"
    ).then((response) => {
      return response.json()
    })
      .then((data) => {
        setLoadedPatients(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <SideNavigation />
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/patients' />
          </Route>
          <Route path='/patients' exact>
            <Patients patients={loadedPatients} />
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
