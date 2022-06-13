import classes from './SaveButton.module.css';
import saveLogo from './diskette.png';

const EditButton = () => {

    return (
        <span className={classes.buttonSpan}>
            <button className={classes.saveButton} type='submit'>
                <img src={saveLogo} alt='save ' />
            </button>
        </span>
    );
};

export default EditButton;