import { Container, Row, Col } from "react-bootstrap";
// import classes from './Klironomiko.module.css';

const KlironomikoOptions = (props) => {
    return (
        <Row>
            <Col xs={1} className='text-end'><input type='checkbox'/></Col>
            <Col cs={5} className='text-start'><label>{props.label}</label></Col>
        </Row>
    );
}
export default KlironomikoOptions;