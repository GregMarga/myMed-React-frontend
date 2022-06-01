import classes from './DeleteButton.module.css';
// import { Link } from 'react-router-dom';
import deleteLogo from './trash.png';

const DeleteButton = () => {
    function deleteHandler() {
        console.log('clicked');
    }
    return (
        <button className={classes.deleteButton} onClick={deleteHandler}>

            <img src={deleteLogo} alt='Delete ' />
        </button>
    );
};

export default DeleteButton;