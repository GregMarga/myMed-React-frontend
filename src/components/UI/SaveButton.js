import classes from './SaveButton.module.css';
import saveLogo from './diskette.png';

const EditButton = () => {

    return (
        <button className={classes.saveButton} type='submit'>
            <img src={saveLogo} alt='save ' />
        </button>
    );
};

export default EditButton;