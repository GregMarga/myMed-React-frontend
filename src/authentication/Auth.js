import './Auth.css';
import Card from '../components/UI/Card';
import Input from './Input';
import Button from './Button';
import {VALIDATOR_EMAIL,VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from '../components/UI/util/validators';
import { useState } from 'react';

const Auth = () => {
    const [isLoginMode,setIsLoginMode]=useState(true);
    const switchModeHandler=()=>{
        setIsLoginMode(prevMode=>!prevMode);
    };
    const authSubmitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <Card className="authentication">
            <h2 className='authentication__header'>Login required</h2>
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && <Input label='Name' type='text' id='name' validators={[VALIDATOR_REQUIRE]} errorText='Please enter your name.'/>}
                <Input
                    type='email'
                    label='E-mail'
                    placeholder=''
                    id='emailInput'
                    validators={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]}
                    errorText='Please enter a valid email address.'
                />
                <Input
                    type='text'
                    label='Password'
                    placeholder=''
                    id='passwordInput'
                    validators={[VALIDATOR_REQUIRE(),VALIDATOR_MINLENGTH(5)]}
                    errorText='Password must be at least 5 characters long.'
                />
                <Button type='sumbit'>{!isLoginMode ? 'Signup':'Login'}</Button>
      
            </form>
            <span className='button_span'><Button inverse className='authenticate' onClick={switchModeHandler}>Swith to {isLoginMode? 'Signup':'Login'}</Button></span>
        </Card>
    )
};

export default Auth;