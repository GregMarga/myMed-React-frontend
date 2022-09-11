import classes from './SaveButton.module.css';
import editLogo from './edit.png';
import { Row, Col } from 'react-bootstrap';

const EditFormButton = (props) => {

    const clickHandler = () => {
        props.onClick()
    }

    return (
        <Row className={`justify-content-md-end justify-content-xs-center ${classes.buttonSpan}`}>
            <Col className='text-center' xs={3}>
                <button className={classes.saveButton} type='button' onClick={clickHandler}>
                    Επεξεργασία <img src={editLogo} alt='edit ' title='Επεξεργασία' />
                </button>
            </Col>
        </Row>
    );
};

export default EditFormButton;