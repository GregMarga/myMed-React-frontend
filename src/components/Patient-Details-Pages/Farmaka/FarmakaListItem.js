import { Row, Col } from "react-bootstrap";
import classes from './FarmakaListItem.module.css';

const FarmakaListItem = (props) => {
    return (
        <Row className={classes.farmakoListItem}>
            <Col className="text-center" sm={4} md={3}>{props.farmakoName}</Col>
            <Col className="text-center" sm={4} md={3}>{props.farmakoType}</Col>
            <Col className="text-center" sm={4} md={2}>{props.dateOfStart}</Col>
            <Col className="text-center" sm={4} md={2}>{props.dateOfEnd}</Col>
            <Col sm={2} className="text-center"></Col>
        </Row>
    );
}

export default FarmakaListItem;