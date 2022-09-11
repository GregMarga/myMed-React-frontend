import classes from './SaveButton.module.css';
import saveLogo from './saveIcon.png';
import { Row, Col } from 'react-bootstrap';

const SaveButton = (props) => {

    // const clickHandler = () => {
    //     props.onClick()
    // }

    return (
        <Row className={`justify-content-md-end justify-content-xs-center ${classes.buttonSpan}`}>
            <Col className='text-center' xs={3}>
                <button className={classes.saveButton} type='submit' >
                    Αποθήκευση <img src={saveLogo} alt='save ' title='Αποθήκευση' />
                </button>
            </Col>
        </Row>
    );
};

export default SaveButton;