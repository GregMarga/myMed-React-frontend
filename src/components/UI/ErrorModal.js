import React, { Fragment } from 'react';
import classes from './ErrorModal.module.css';
import Backdrop from './Backdrop';

const ErrorModal = props => {
  console.log(props.error)
  return (
    <Fragment>
      <Backdrop onClick={props.onClear} />
      <div className={classes.errorModal}>
        <header>
          <h3> Υπήρξε ένα σφάλμα!</h3>
        </header>
        <div>{props.error}</div>
        <span className={classes.myButton}>
          <button className={classes.delete} onClick={props.onClear}>Εντάξει</button>
        </span>
      </div>
    </Fragment>
  );
};

export default ErrorModal;
