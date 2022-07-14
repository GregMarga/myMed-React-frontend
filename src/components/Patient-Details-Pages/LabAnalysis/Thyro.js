import { Fragment } from 'react';
import classes from './Thyro.module.css';
import Card from '../../UI/Card';
import { Container, Col, Row } from 'react-bootstrap';
import SaveButton from '../../UI/SaveButton';


const Thyro = () => {
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
                        <Row>
                            <Col className={classes.myCol}>
                                <label>Ημ/νία</label>
                                <input name='date' type='date' required />
                            </Col>
                        </Row>

                        <Row >
                            <Col className={classes.myCol}>
                                <label>TSH</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>T4</label>
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
                                <label>T3</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>FT3</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>AbTPO</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>TRab</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>CT</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Tg</label>
                                <input type='number' />
                            </Col>
                        </Row>
                        <Row><Col><SaveButton /></Col></Row>

                    </Container>
                </form>
            </Card>
        </Fragment>
    );
};

export default Thyro;