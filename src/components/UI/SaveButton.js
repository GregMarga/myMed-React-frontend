import classes from './SaveButton.module.css';
import saveLogo from './diskette.png';

const EditButton = (props = { onClick: () => { } }) => {
    console.log(props)
    const clickHandler = () => {
        props.onClick()
    }

    return (
        <span className={classes.buttonSpan}>
            <button className={classes.saveButton} type='submit' onClick={clickHandler}>
                <img src={saveLogo} alt='save ' title='Αποθήκευση' />
            </button>
        </span>
    );
};

export default EditButton;