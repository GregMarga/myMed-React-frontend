import classes from './DeleteModal.module.css';

const DeleteModal = (props) => {
    return (
        <div className={classes.deleteModal}>
            <header>
                <h3> Are you sure?</h3>
            </header>
            <div>{props.description}</div>
            <span className={classes.myButtons}>
                <button className={classes.cancel} onClick={props.onCancel}>Cancel</button>
                <button className={classes.delete} onClick={props.onConfirm}>Delete</button>
            </span>


        </div>
    );
}

export default DeleteModal;