import { Fragment } from "react";
import { Container,Col,Row } from "react-bootstrap";
import classes from './ListsHeader.module.css';


const VisitsHeader=(props)=>{
    return (
        <Fragment>
            <Container fluid className={classes.visitsHeader}>
                <Row className="justify-content-center">
                    <Col xs={(!!props.title)?'5':'4'} className={`${classes.test} text-sm-center`} ><h4>{props.type}</h4></Col>
                    <Col className={`${classes.test} text-sm-center `}><h4>{props.date}</h4></Col>
                    <Col className={`text-center `}><h4>{props.diagnosis}</h4></Col>
                    <Col sm='2'></Col>
                </Row>
            </Container>
            
        </Fragment>
    );
};

export default VisitsHeader;