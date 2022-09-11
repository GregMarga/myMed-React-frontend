import { Route, Switch, Redirect } from 'react-router-dom';
import PatientDetail from './pages/PatientDetail';
import PatientProfile from './components/Patient-Profile/PatientProfile';
import Statistics from './components/Patient-Profile/Statistics/Statistics';
import Patients from './pages/Patients';
import Auth from './authentication/Auth';
import { AuthContext } from './context/auth-context';
import { PatientContext } from './context/patient-context';
import { useState, useCallback, useEffect } from 'react';
import Logo from './components/UI/Logo'
import { useHistory } from 'react-router-dom';
import EmailConfirmation from './authentication/EmailConfirmation'


let logoutTimer;

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [visitId, setVisitId] = useState(null);
  const [anamnistikoId, setAnamnistikoId] = useState(null);
  const [gender, setGender] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const history = useHistory();


  const createPatientId = useCallback((patientId) => {
    setPatientId(patientId);
    localStorage.setItem('patientId', patientId)
  }, []);
  const setPatientIdNull = useCallback(() => {
    setPatientId(null);
    localStorage.removeItem('patientId')
  })

  const createVisitId = useCallback((visitId) => {
    setVisitId(visitId);
    localStorage.setItem('visitId', visitId)
  }, []);
  const setVisitNull = useCallback(() => {
    setVisitId(null);
    localStorage.removeItem('visitId')
  })

  const changeGender = useCallback((gender) => {
    setGender(gender);
    localStorage.setItem('gender', gender)
  }, []);
  const setGenderNull = useCallback(() => {
    setGender(null);
    localStorage.removeItem('gender')
  })

  const createAnamnistikoId = useCallback((anamnistikoId) => {
    setAnamnistikoId(anamnistikoId);
  }, []);
  const setAnamnistikoNull = useCallback(() => {
    setAnamnistikoId(null);
  })

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 2);
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
    localStorage.removeItem('patientId');
    localStorage.removeItem('gender');
    localStorage.removeItem('visitId')
    history.replace('/')
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

  useEffect(() => {
    const storedData = localStorage.getItem('patientId');
    if (storedData) {
      createPatientId(storedData);
    }
  }, [createPatientId]);

  useEffect(() => {
    const storedData = localStorage.getItem('visitId');
    if (storedData) {
      createVisitId(storedData);
    }
  }, [createVisitId]);


  let routes;
  if (token === null) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Logo />
          <Auth />
        </Route >
        <Route path='/:userId/emailconfirmation' exact>
          <EmailConfirmation />
        </Route>
        {/* <Route path='/' >
          <Redirect to='/' />
        </Route > */}
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Logo />
          <Patients />
        </Route>

        <Route path='/patients' exact>
          <Logo />
          <Patients />

        </Route>
        <Route path='/patients/:patientId/profile' exact>
          <Logo />
          <PatientProfile />
        </Route>

        <Route path='/patients/:patientId/statistics' exact>
          <Logo />
          <Statistics />
        </Route>

        <Route path='/patients/:patientId' >
          <Logo />
          <PatientDetail />
        </Route>

        <Route path='/:userId/emailconfirmation' >
          <Redirect to='/' />
        </Route>
        {/* <Route path='/' >
          <Redirect to='/' />
        </Route > */}

      </Switch>
    )

  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}>
      <PatientContext.Provider value={{ gender: gender, patientId: patientId, visitId: visitId, createPatientId: createPatientId, setPatientIdNull: setPatientIdNull, setGenderNull: setGenderNull, changeGender: changeGender, createVisitId: createVisitId, setVisitNull: setVisitNull }}>
        <div className='backgroundImage'>
          <main>

            {routes}

          </main>
        </div>
      </PatientContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
