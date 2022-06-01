import { Fragment } from 'react';
import classes from './Epinefridia.module.css';
import Card from '../../UI/Card';
import { Container,Col,Row } from 'react-bootstrap';


const Epinefridia = () => {
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
                                <label>TSH</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>T4</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>FT4</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>T3</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>FT3</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>AbTPO</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>TRab</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>CT</label>
                                <input />
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className={classes.myCol}>
                                <label>Tg</label>
                                <input />
                            </Col>
                        </Row>

                    </Container>
                </form>
            </Card>
        </Fragment>
    );
};

export default Epinefridia;