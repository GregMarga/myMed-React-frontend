import { Row, Col } from "react-bootstrap";
import classes from './DiagnosisListItem.module.css'

const DiagnosisListItem = (props) => {
    return (
            <Row className={classes.conditionsListItem}>
                <Col className="text-center" sm={4}><span>{props.condition}</span></Col>
                <Col className="text-center" sm={2}><span>{props.state}</span></Col>
                {/* <Col className="text-center" sm={2}><span>{props.severity}</span></Col> */}
                <Col className="text-center"><span>{props.dateOfDiagnosis}</span></Col>
                <Col className="text-center" ><span>{props.dateOfHealing}</span></Col>
                <Col sm={2}></Col>
            </Row>
      
    );
}

export default DiagnosisListItem;