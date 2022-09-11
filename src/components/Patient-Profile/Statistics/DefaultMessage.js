import { Container, Row, Col } from "react-bootstrap"
import classes from './DefaultMessage.module.css'

const DefaultMessage = (props) => {
    return (
        <Container>
            <Row>
                <Col className='text-center'><span className={classes.spanMessage}>{props.message}</span></Col>
            </Row>
        </Container>
    )
}

export default DefaultMessage;
