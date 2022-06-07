import { NavLink } from 'react-router-dom';
import classes from './SideNavigation.module.css'
import { Navbar, Container } from 'react-bootstrap';
import { AuthContext } from '../context/auth-context';
import { useContext } from 'react';

const SideNavigation = () => {
    const auth = useContext(AuthContext);
    return (
        <Navbar expand='lg'>
            <Container fluid>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <header className={classes.header}>
                        <ul>
                            <li>
                                <NavLink className={classes.headerA} activeClassName={classes.active} to='/patients'>Patients</NavLink>
                            </li>
                            <li>
                                <NavLink className={classes.headerA} activeClassName={classes.active} to='/Appointments'>Appointments</NavLink>
                            </li>
                            {auth.isLoggedIn &&
                                <li>
                                    <button onClick={auth.logout} className={classes.logoutButton}><NavLink  to='/'>Logout</NavLink></button>
                                </li>
                            }
                        </ul>
                    </header>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default SideNavigation;