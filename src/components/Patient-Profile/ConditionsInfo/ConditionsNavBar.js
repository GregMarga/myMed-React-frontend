import { Row, Col } from "react-bootstrap";
import classes from './ConditionsNavBar.module.css'

const ConditionsNavBar = (props) => {
    return (
        <Row className={classes.navBar}>
            <button onClick={()=>{props.setTabIsOpen('atomiko')}}>Ατομικό</button>
            <button onClick={()=>{props.setTabIsOpen('allergies')}}>Αλλεργίες</button>
            <button onClick={()=>{props.setTabIsOpen('klironomiko')}}>Κληρονομικό</button>
            <button onClick={()=>{props.setTabIsOpen('surgeries')}}> Χειρουργεία</button>
            <button onClick={()=>{props.setTabIsOpen('farmaka')}}>Φάρμακα</button>
            <button onClick={()=>{props.setTabIsOpen('files')}}>Αρχεία</button>
            <button onClick={()=>{props.setTabIsOpen('')}}> Γυναικολογικό</button>
        </Row>
    )
}

export default ConditionsNavBar;