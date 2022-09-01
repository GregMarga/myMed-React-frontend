import { Row, Col } from "react-bootstrap";
import classes from './ConditionsNavBar.module.css'

const ConditionsNavBar = (props) => {
   
    return (
        <Row className={classes.navBar}>
            <button className={(props.tabIsOpen==='atomiko')?classes.activated:null} onClick={()=>{props.setTabIsOpen('atomiko')}}>Ατομικό</button>
            <button className={(props.tabIsOpen==='allergies')?classes.activated:null} onClick={()=>{props.setTabIsOpen('allergies')}}>Αλλεργίες</button>
            <button className={(props.tabIsOpen==='klironomiko')?classes.activated:null} onClick={()=>{props.setTabIsOpen('klironomiko')}}>Κληρονομικό</button>
            <button className={(props.tabIsOpen==='surgeries')?classes.activated:null} onClick={()=>{props.setTabIsOpen('surgeries')}}> Χειρουργεία</button>
            <button className={(props.tabIsOpen==='farmaka')?classes.activated:null} onClick={()=>{props.setTabIsOpen('farmaka')}}>Φάρμακα</button>
            <button className={(props.tabIsOpen==='files')?classes.activated:null} onClick={()=>{props.setTabIsOpen('files')}}>Αρχεία</button>
            <button className={(props.tabIsOpen==='gynaikologiko')?classes.activated:null} onClick={()=>{props.setTabIsOpen('')}}> Γυναικολογικό</button>
        </Row>
    )
}

export default ConditionsNavBar;