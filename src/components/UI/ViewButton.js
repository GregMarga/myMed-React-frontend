import classes from './ViewButton.module.css';
import viewLogo from './view.png';

const ViewButton = (props) => {
    return (

        <button type='button' className={classes.viewButton} onClick={props.onClick} title='Προβολή αρχείου'>

            <img src={viewLogo} alt='view ' />
        </button>



    );
};

export default ViewButton;