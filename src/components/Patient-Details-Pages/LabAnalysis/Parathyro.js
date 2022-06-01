import { Fragment } from 'react';
import classes from './Parathyro.module.css';
import Card from '../../UI/Card';
import { Container,Col,Row } from 'react-bootstrap';


const Parathyro = () => {
    return (
        <Fragment>
            <Card>
                <form className={classes.thyroForm}>

                    <Container >
                        <Row >
                            <Col className={classes.myCol}>
                                <span>Πεδία</span>
                                <span>Τιμές(mg)</span>
                            </Col>
                        </Row>

                        <Row >
                            <Col className={classes.myCol}>
                                <label>PTH</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>vitD</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Ca</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>P</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Αλβουμίνη</label>
                                <input />
                            </Col>
                        </Row>                      
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Κρεατινίνη</label>
                                <input />
                            </Col>
                        </Row>
                    
                    </Container>
                </form>
            </Card>
        </Fragment>
    );
};

export default Parathyro;