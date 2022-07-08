import { Route, Switch, Redirect } from 'react-router-dom';
import SideNavigation from './components/SideNavigation';
import Appointment from './pages/Appointment';
import PatientDetail from './pages/PatientDetail';
import Statistics from './pages/Statistics';
import Patients from './pages/Patients';
import Auth from './authentication/Auth';
import { AuthContext } from './context/auth-context';
import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();


  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token: token,
      expiration: tokenExpirationDate.toISOString()
    })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate();
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);


  let routes;
  if (token === null) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Auth />
        </Route >
        <Route path='/' >
          <Redirect to='/' />
        </Route >
      </Switch>
    )
  } else {
    routes = (
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
          <Appointment />
        </Route>
        <Route path='/patients/:patientId' >
          <SideNavigation />
          <PatientDetail />
        </Route>
        <Route path='/Statistics' >
          <SideNavigation />
          <Statistics />
        </Route>

      </Switch>
    )

  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}>
      <main>
        {routes}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
