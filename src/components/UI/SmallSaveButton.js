import classes from './SmallDeleteButton.module.css';
import saveLogo from './check.png';

const SmallSaveButton = (props = { onClick: () => { } }) => {
    const clickHandler = () => {
        props.onClick()
    }

    return (
        <span className={classes.buttonSpan}>
            <button className={classes.saveButton} type='button' onClick={clickHandler}>
                <img src={saveLogo} alt='save ' title='Αποθήκευση' />
            </button>
        </span>
    );
};

export default SmallSaveButton;