import { Navbar, Container, Row, Col } from "react-bootstrap"
import logo from './logo.jpg';
import classes from './Logo.module.css';
import { AuthContext } from "../../context/auth-context";
import { useContext, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { useState } from "react";
import { useParams } from "react-router-dom";

const Logo = () => {
    const [addPatient, setAddPatient] = useState(false);

    const params = useParams();
    useEffect(() => {
        if (params.patientId === 'new') {
            setAddPatient(true);
        } else {
            setAddPatient(false);
        }
    }, [params.patientId]);

    const auth = useContext(AuthContext);


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
                    {addPatient && <Row className="justify-content-md-center">
                        <Col lg={0} xl={4} className='text-start'></Col>
                        <Col className="text-center"md={4} lg={2} xl={1}><button className={classes.linkButton}> <NavLink to={`/`}>Αρχική</NavLink></button></Col>
                        <Col className="text-center">
                            <button className={classes.linkButton}>  <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/basic`}>Βασικά</NavLink></button>
                        </Col>
                        <Col className="text-center"><button className={classes.linkButton}> <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/anamnistiko`}>Αναμνηστικό</NavLink></button></Col>
                        <Col className="text-center"md={4} lg={2} xl={2}> <button className={classes.linkButton}> <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/farmaka`}>Φαρμακευτική Αγωγή</NavLink></button></Col>
                        <Col className="text-center"md={4} lg={2} xl={1}>  <button className={classes.linkButton}> <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/aad`}>Αρχεία</NavLink></button></Col>
                        <Col className="text-center"md={4} lg={2} xl={2}> <button className={classes.linkButton}>  <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/visits`}> Δημιουργία Επίσκεψης</NavLink></button></Col>

                    </Row>}
                </Container>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Logo;