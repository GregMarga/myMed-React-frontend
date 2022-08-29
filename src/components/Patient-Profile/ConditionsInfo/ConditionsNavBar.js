import { Row, Col } from "react-bootstrap";
import classes from './ConditionsNavBar.module.css'

const ConditionsNavBar = () => {
    return (
        <Row className={classes.navBar}>
            Ατομικό
            Κληρονομικό
            Χειρουργεία
             Γυναικολογικό
        </Row>
    )
}

export default ConditionsNavBar;