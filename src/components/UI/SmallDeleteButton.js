import classes from './SmallDeleteButton.module.css';
import closeLogo from './close.png';

const EditButton = (props = { onClick: () => { } }) => {
    const clickHandler = () => {
        props.onClick()
    }

    return (
        <span className={classes.buttonSpan}>
            <button className={classes.saveButton} type='button' onClick={clickHandler}>
                <img src={closeLogo} alt='delete ' title='ακύρωση' />
            </button>
        </span>
    );
};

export default EditButton;