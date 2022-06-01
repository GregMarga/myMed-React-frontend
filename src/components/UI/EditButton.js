import classes from './EditButton.module.css';
import editLogo from './edit.png';

const EditButton = () => {
    return (

        <button className={classes.editButton}>

            <img src={editLogo} alt='Edit ' />
        </button>



    );
};

export default EditButton;