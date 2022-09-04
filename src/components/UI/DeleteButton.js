import classes from './DeleteButton.module.css';
// import { Link } from 'react-router-dom';
import deleteLogo from './trash.png';

const DeleteButton = (props) => {
    
    return (
        <button type='button' className={classes.deleteButton} onClick={props.onClick} title='Διαγραφή'>

            <img src={deleteLogo} alt='Delete ' />
        </button>
    );
};

export default DeleteButton;