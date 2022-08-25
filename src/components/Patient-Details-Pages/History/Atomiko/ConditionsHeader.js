import { Row,Col } from "react-bootstrap";
import classes from './ConditionsHeader.module.css';

const ConditionsHeader=()=>{
    return (
        <Row className={classes.conditionsHeader}>
            <Col className="text-center" md={4}>Πάθηση</Col>
            <Col className="text-center" sm={2}>Κατάσταση</Col>
            <Col className="text-center" sm={2}>Ημ/νία Διάγνωσης</Col>
            <Col className="text-center" sm={2}>Ημ/νία Θεραπείας</Col>
            <Col className="text-center" sm={2}></Col>
        </Row>
    );
}

export default ConditionsHeader;