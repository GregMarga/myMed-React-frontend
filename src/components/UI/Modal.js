import Form from './PatientForm'


const Modal=(props)=>{
    return(
        <div className="my_modal">
            <Form onClick={props.onClose} onSubmit={props.onSubmit}/>
        </div>
    );
}

export default Modal;