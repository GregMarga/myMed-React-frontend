import { Navbar, Container, Row, Col } from "react-bootstrap"
import logo from './logo.jpg';
import classes from './Logo.module.css';
import { AuthContext } from "../../context/auth-context";
import { useContext, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PatientContext } from "../../context/patient-context";

const Logo = (props) => {
    const [addPatient, setAddPatient] = useState(false);
    const [profile, setProfile] = useState(false);
    const [showVisit, setShowVisit] = useState(false)

    const params = useParams();
    console.log(params.visitId)

    useEffect(() => {
        console.log('in')
        if (params.patientId === 'new') {
            setAddPatient(true);
        } else {
            setAddPatient(false);
        }
        if (!!params.patientId) {
            if (params.patientId.length > 5) {
                setProfile(true)
            }
        } else {
            setProfile(false)
            setAddPatient(false)
        }
    }, [params.patientId]);

    useEffect(() => {
        if (!!params.visitId && params.visitId !== 'new') {
            setShowVisit(true)
        } else {
            setShowVisit(false)
        }
    }, [params.visitId])

    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);

    console.log(showVisit)

    return (
        <Navbar expand='lg' className={classes.logoCard}>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id="basic-navbar-nav">
                <Container fluid >
                    <Row>
                        <Col>
                            <Link to='/'>
                                <img src={logo} alt='logo' />
                            </Link>
                            {/* <img src={or} alt='vertical bar' /> */}
                            <span>Μία εφαρμογή διαχείρισης δεδομένων ασθενών.</span>

                        </Col>
                        {/* <Col>Βασικά</Col>
                <Col>Βασικά</Col> */}
                        {auth.isLoggedIn && <Col xs={2} className='text-center'><button className={classes.logoutButton} onClick={auth.logout}>Αποσύνδεση</button></Col>}
                        {/* <Col>Μία εφαρμογή διαχείρισης δεδομένων ασθενών.</Col> */}
                    </Row>
                    {addPatient && <Row className="justify-content-md-end">
                        <Col className="text-center" md={4} lg={2} xxl={1}><button className={classes.linkButton}> <NavLink to={`/`}>Αρχική</NavLink></button></Col>
                        <Col className="text-center"md={4} lg={2} xxl={1}>
                            <button className={classes.linkButton}>  <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/basic`}>Βασικά</NavLink></button>
                        </Col>
                        <Col className="text-center"md={4} lg={2} xxl={2}><button className={classes.linkButton}> <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/anamnistiko`}>Αναμνηστικό</NavLink></button></Col>
                        <Col className="text-center" md={4} lg={2} xxl={2}> <button className={classes.linkButton}> <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/farmaka`}>Φαρμακευτική Αγωγή</NavLink></button></Col>
                        <Col className="text-center" md={4} lg={2} xxl={1}>  <button className={classes.linkButton}> <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/aad`}>Αρχεία</NavLink></button></Col>
                        <Col className="text-center" md={4} lg={2} xxl={2}> <button className={classes.linkButton}>  <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/visits`}> Δημιουργία Επίσκεψης</NavLink></button></Col>

                    </Row>}
                    {profile && !showVisit && !props.basic && <Row className="justify-content-md-end">

                        <Col className="text-center" md={4} lg={2} ><button className={classes.linkButton}> <NavLink to={`/`}>Αρχική</NavLink></button></Col>
                        <Col className="text-center" md={4} lg={2}>
                            <button className={classes.linkButton}>  <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/profile`}>Προφίλ</NavLink></button>
                        </Col>
                        <Col className="text-center" md={4} lg={2}>  <button className={classes.linkButton}> <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/statistics`}>Στατιστικά</NavLink></button></Col>
                        <Col className="text-center" md={4} lg={2} > <button className={classes.linkButton} onClick={() => { patientContext.createVisitId('new') }}>  <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/visits/new`}> Δημιουργία Επίσκεψης</NavLink></button></Col>

                    </Row>}
                    {showVisit && <Row className="justify-content-md-end">
                        <Col className="text-center" md={4} lg={2} ><button className={classes.linkButton}> <NavLink to={`/`}>Αρχική</NavLink></button></Col>
                        <Col className="text-center" md={4} lg={2}>
                            <button className={classes.linkButton}>  <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/profile`}>Προφίλ</NavLink></button>
                        </Col>
                        <Col className="text-center" md={4} lg={2}>  <button className={classes.linkButton}> <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/visits/${params.visitId}`}>Προβολή Επίσκεψης</NavLink></button></Col>

                    </Row>}
                    {!!props.basic && <Row className="justify-content-md-center">
                        <Col lg={1} xxl={6} className='text-start'></Col>
                        <Col className="text-end" md={4} lg={2} ><button className={classes.linkButton}> <NavLink to={`/`}>Αρχική</NavLink></button></Col>
                        <Col className="text-center" lg={2}>
                            <button className={classes.linkButton}>  <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/profile`}>Προφίλ</NavLink></button>
                        </Col>
                        <Col className="text-start" md={4} lg={2}>  <button className={classes.linkButton}> <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/basics`}>Επεξεργασία Στοιχείων</NavLink></button></Col>

                    </Row>}
                </Container>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Logo;