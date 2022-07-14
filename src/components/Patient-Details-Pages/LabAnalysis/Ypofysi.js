import { Fragment } from 'react';
import classes from './Ypofysi.module.css';
import Card from '../../UI/Card';
import { Container, Col, Row } from 'react-bootstrap';


const Ypofysi = () => {
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
                                <label>FSH</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>LH</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Testo</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>E2</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>TSH</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>FT4</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>ACTH</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Φυρτιζόλη</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>GH</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>IGF-1</label>
                                <input type='number' />
                            </Col>
                        </Row>

                    </Container>
                </form>
            </Card>
        </Fragment>
    );
};

export default Ypofysi;