import { Navbar, Container, Row, Col } from "react-bootstrap"
import logo from './logo.jpg';
import classes from './Logo.module.css';
import { AuthContext } from "../../context/auth-context";
import { useContext, useEffect } from "react";
import { NavLink } from 'react-router-dom';
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
        <Navbar expand='lg'>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id="basic-navbar-nav">
                <Container fluid className={classes.logoCard}>
                    <Row>
                        <Col>
                            <img src={logo} alt='logo' />
                            {/* <img src={or} alt='vertical bar' /> */}
                            <span>Μία εφαρμογή διαχείρισης δεδομένων ασθενών.</span>

                        </Col>
                        {/* <Col>Βασικά</Col>
                <Col>Βασικά</Col> */}
                        {auth.isLoggedIn && <Col xs={2} className='text-center'><button className={classes.logoutButton} onClick={auth.logout}>Αποσύνδεση</button></Col>}
                        {/* <Col>Μία εφαρμογή διαχείρισης δεδομένων ασθενών.</Col> */}
                    </Row>
                    {addPatient && <Row className="justify-content-md-center">
                        <Col xs={4} className='text-start'></Col>
                        <Col className="text-center">
                            <button className={classes.linkButton}>  <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/basic`}>Βασικά</NavLink></button>
                        </Col>
                        <Col className="text-center"><button className={classes.linkButton}> <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/anamnistiko`}>Αναμνηστικό</NavLink></button></Col>
                        <Col className="text-center"> <button className={classes.linkButton}> <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/farmaka`}>Φαρμακευτική Αγωγή</NavLink></button></Col>
                        <Col className="text-center">  <button className={classes.linkButton}> <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/aad`}>Αρχεία</NavLink></button></Col>
                        <Col className="text-center"> <button className={classes.linkButton}>  <NavLink activeClassName={classes.active} to={`/patients/${params.patientId}/visits`}> Δημιουργία Επίσκεψης</NavLink></button></Col>

                    </Row>}
                </Container>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Logo;