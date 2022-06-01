import classes from './GeneralBlood.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Fragment } from 'react';
import Card from '../../UI/Card';

const GeneralBlood = () => {
    return (<Fragment>
        <Card>
            <form className={classes.bloodForm}>



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
                            <input type='date' />
                        </Col>
                    </Row>



                    <Row >
                        <Col className={classes.myCol}>
                            <label>Κάλλιο</label>
                            <input />
                        </Col>
                    </Row>
                    <Row className='justify-content-center '>
                        <Col className={classes.myCol}>
                            <label>Νάτριο</label>
                            <input />
                        </Col>
                    </Row>
                    <Row className='justify-content-center '>
                        <Col className={classes.myCol}>
                            <label>Ασβέστιο</label>
                            <input />
                        </Col>
                    </Row>
                    <Row className='justify-content-center '>
                        <Col className={classes.myCol}>
                            <label>Ht</label>
                            <input />
                        </Col>
                    </Row>
                    <Row className='justify-content-center '>
                        <Col className={classes.myCol}>
                            <label>MCV</label>
                            <input />
                        </Col>
                    </Row>
                    <Row className='justify-content-center '>
                        <Col className={classes.myCol}>
                            <label>SGOT</label>
                            <input />
                        </Col>
                    </Row>
                    <Row className='justify-content-center '>
                        <Col className={classes.myCol}>
                            <label>B12</label>
                            <input />
                        </Col>
                    </Row>
                    <Row className='justify-content-center '>
                        <Col className={classes.myCol}>
                            <label>Hb</label>
                            <input />
                        </Col>
                    </Row>

                </Container>
            </form>
        </Card>

    </Fragment>

    );
};

export default GeneralBlood;