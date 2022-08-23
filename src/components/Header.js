import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import { Navbar, Container, Row, Col } from 'react-bootstrap';

const Header = (props) => {
    return (
        <Navbar expand='lg'>
            <Container fluid>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <header className={classes.myHeader}>
                        <Row className='align-items-center'>
                            <nav>
                                <ul>
                                    <Col className='text-center'>
                                        <li>

                                            <NavLink activeClassName={classes.active} to={`/patients/${props.patientId}/basic`}><span>Βασικά</span></NavLink>

                                        </li>
                                    </Col>
                                    <Col className='text-center'>
                                        <li>
                                            <NavLink activeClassName={classes.active} to={`/patients/${props.patientId}/anamnistiko`}><span>Αναμνηστικό</span></NavLink>
                                        </li>
                                    </Col>
                                    
                                    <Col className='text-center'>
                                        <li>
                                            <NavLink activeClassName={classes.active} to={`/patients/${props.patientId}/aad`}><span>Αρχεία</span></NavLink>
                                        </li>
                                    </Col>
                                    {/* <Col>
                                <li>
                                    <NavLink activeClassName={classes.active} to={`/patients/${props.patientId}/clinical`}>Κλινική Εξέταση</NavLink>
                                </li>
                                </Col> */}
                                    <Col className='text-center'>
                                        <li>
                                            <NavLink activeClassName={classes.active} to={`/patients/${props.patientId}/lab_test`}><span>Εργαστηριακός Έλεγχος</span></NavLink>
                                        </li>
                                    </Col>
                                    <Col className='text-center'>
                                        <li>
                                            <NavLink activeClassName={classes.active} to={`/patients/${props.patientId}/visits`}><span>Δημιουργία Επίσκεψης</span></NavLink>
                                        </li>
                                    </Col>
                                </ul>
                            </nav>
                        </Row>

                    </header>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
/*  
         <header className={classes.myHeader}>
             <nav>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.active} to={`/patients/${props.patientId}/basic`}>Βασικά</NavLink>
                     </li>
                     <li>
                        <NavLink activeClassName={classes.active} to={`/patients/${props.patientId}/anamnistiko`}>Αναμνηστικό</NavLink>
                </li>
                     <li>
                         <NavLink activeClassName={classes.active} to={`/patients/${props.patientId}/fdf`}>Επισκέψεις</NavLink>
                </li>
                     <li>
                     <NavLink activeClassName={classes.active} to={`/patients/${props.patientId}/aad`}>Αρχεία</NavLink>
                     </li>
                     <li>
                         <NavLink activeClassName={classes.active} to={`/patients/${props.patientId}/clinical`}>Κλινική Εξέταση</NavLink>
                     </li>
                     <li>
                         <NavLink activeClassName={classes.active} to={`/patients/${props.patientId}/lab_test`}>Εργαστηριακός Έλεγχος</NavLink>
                     </li>
                 </ul>
             </nav>
         </header>
     );
};  */

export default Header;