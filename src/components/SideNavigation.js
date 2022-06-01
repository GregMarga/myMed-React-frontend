import { NavLink } from 'react-router-dom';
import classes from './SideNavigation.module.css'
import { Navbar, Container } from 'react-bootstrap';

const SideNavigation = () => {
    return (
        <Navbar expand='lg'>
            <Container fluid>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id="basic-navbar-nav">
                <header className={classes.header}>
                    <ul>
                        <li>
                            <NavLink activeClassName={classes.active} to='/patients'>Patients</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={classes.active} to='/Appointments'>Appointments</NavLink>
                        </li>
                    </ul>
                </header>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
// const SideNavigation = () => {
//     return (
//         <header className={classes.header}>
//             <nav>
//                 <ul>
//                     <li>
//                         <NavLink activeClassName={classes.active} to='/patients'>Patients</NavLink>
//                     </li>
//                     <li>
//                         <NavLink activeClassName={classes.active} to='/Appointments'>Appointments</NavLink>
//                     </li>
//                     {/* <li>
//                         <NavLink  activeClassName={classes.active} to='/dfdaf'>Patients</NavLink>
//                     </li>
//                     <li>
//                         <NavLink activeClassName={classes.active} to='/fdasf'>Appointments</NavLink>
//                     </li> */}
//                 </ul>
//             </nav>
//         </header>
//     );
// }

export default SideNavigation;