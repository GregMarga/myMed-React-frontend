import classes from './DeleteModal.module.css';

const DeleteModal = (props) => {
    return (
        <div className={classes.deleteModal}>
            <header>
                <h3> Are you sure?</h3>
            </header>
            <div>Do you want to proceed and delete this patient?Please note that it can't be undone once thereafter.</div>
            <button className={classes.cancel} onClick={props.onCancel}>Cancel</button>
            <button className={classes.delete} onClick={props.onConfirm}>Delete</button>
        </div>
    );
}

export default DeleteModal;