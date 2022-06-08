import './Auth.css';
import Card from '../components/UI/Card';
import Input from './Input';
import Button from './Button';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../components/UI/util/validators';
import { useForm } from '../hooks/form-hook';
import { useHttpClient } from '../hooks/http-hook';
import { useState, useContext, Fragment } from 'react';
import { AuthContext } from '../context/auth-context';
import ErrorModal from '../components/UI/ErrorModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();


    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = async event => {
        event.preventDefault();

        if (isLoginMode) {
            try {
                const responseData = await sendRequest('http://localhost:5000/users/login', 'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }), {
                    'Content-Type': 'application/json'
                });
                auth.login(responseData.user.id);
            } catch (err) {}

        } else {
            try {
                const responseData=await sendRequest('http://localhost:5000/users/signup', 'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    });
                auth.login(responseData.user.id);
            } catch (err) {  }
        }

    };
    return (
        <Fragment>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a name."
                            onInput={inputHandler}
                        />
                    )}
                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="E-Mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address."
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid password, at least 5 characters."
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
                <span className='button_span'><Button inverse onClick={switchModeHandler}>
                    SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
                </Button></span>
            </Card>
        </Fragment>
    );
};

export default Auth;
