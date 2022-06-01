import Form from './PatientForm'

const Modal=(props)=>{
    return(
        <div className="my_modal">
            <Form/>
            <button className="btn btn--alt" onClick={props.onClose}>Cancel</button>
            <button className="btn">Add </button>
        </div>
    );
}

export default Modal;