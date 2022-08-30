import { Row, Col } from "react-bootstrap";
import classes from './ConditionsListItem.module.css'
import SmallDeleteButton from '../../../UI/SmallDeleteButton'

const ConditionsListItem = (props) => {
    const clickHandler=(event)=>{
        props.removeConditionHandler(props.id)
    }


    return (
            <Row className={classes.conditionsListItem}>
                <Col className="text-center" sm={4}><span>{props.condition}</span></Col>
                <Col className="text-center" sm={2}><span>{props.state}</span></Col>
                {/* <Col className="text-center" sm={2}><span>{props.severity}</span></Col> */}
                <Col className="text-center"><span>{props.dateOfDiagnosis}</span></Col>
                <Col className="text-center" ><span>{props.dateOfHealing}</span></Col>
                <Col sm={2} className="text-center">
                    <SmallDeleteButton onClick={clickHandler}/>
                </Col>
            </Row>
      
    );
}

export default ConditionsListItem;