import { Route, Switch, Redirect } from 'react-router-dom';
import SideNavigation from './components/SideNavigation';
import Appointments from './pages/Appointments';
import PatientDetail from './pages/PatientDetail';
import Patients from './pages/Patients';
import Auth from './authentication/Auth';
import { AuthContext } from './context/auth-context';
import { useState, useCallback } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId,setUserId]=useState(null);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (!isLoggedIn) {
    routes=(
      <Switch>
        <Route path='/' exact>
          <Auth />
        </Route>
        {/* <Route path='/' exact>
          <Redirect to='/auth' />
        </Route> */}
      </Switch>
    )
  } else {
    routes=(
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
      </Switch>
    )

  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn,userId:userId, login: login, logout: logout }}>
      <main>
        {routes}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
