import classes from './SaveButton.module.css';
import saveLogo from './diskette.png';
import { Row, Col } from 'react-bootstrap';

const EditButton = (props = { onClick: () => { } }) => {

    const clickHandler = () => {
        props.onClick()
    }

    return (
        <Row className={`justify-content-md-end  ${classes.buttonSpan}`}>
            <Col className='text-center' xs={3}>
                <button className={classes.saveButton} type='submit' onClick={clickHandler}>
                    <img src={saveLogo} alt='save ' title='Αποθήκευση' />
                </button>
            </Col>
        </Row>
    );
};

export default EditButton;