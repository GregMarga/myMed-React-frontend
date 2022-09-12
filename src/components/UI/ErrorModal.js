import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './ErrorModal.module.css';
import Backdrop from './Backdrop';

const ErrorModal = props => {
  
  return (
    <Fragment>
      <Backdrop onClick={props.onClear} />
      {/* <div className={classes.errorModal}>
        <header>
          <h3> Υπήρξε ένα σφάλμα!</h3>
        </header>
        <div>{props.error}</div>
        <span className={classes.myButton}>
          <button className={classes.delete} onClick={props.onClear}>Εντάξει</button>
        </span>
      </div> */}


      <Container className={classes.errorModal}>
        <Row>
          <header>
            <h3> Υπήρξε ένα σφάλμα!</h3>
          </header>
        </Row>
        <Row >
          <Col><span>{props.error}</span></Col>
        </Row>

        <Row className={`${classes.buttonRow} justify-content-sm-end`}>
          <Col xs={5} sm={3}><button className={classes.delete} onClick={props.onClear}>Έντάξει</button></Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ErrorModal;
