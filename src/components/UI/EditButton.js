import classes from './EditButton.module.css';
import editLogo from './edit.png';

const EditButton = (props) => {
    return (

        <button className={classes.editButton} onClick={props.onClick}>

            <img src={editLogo} alt='Edit ' />
        </button>



    );
};

export default EditButton;