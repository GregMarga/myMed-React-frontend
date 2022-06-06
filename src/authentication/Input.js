import './Input.css';
import { useReducer } from 'react';
import { validate } from '../components/UI/util/validators';


const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state;
    }
};

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false,
        isTouched: false
    });
    function touchHandler() {
        dispatch({
            type: 'TOUCH'
        })
    }
    function changeHandler(event) {
        dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
    }

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}    //user loses focus
                value={inputState.value}
            />
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
}

export default Input;