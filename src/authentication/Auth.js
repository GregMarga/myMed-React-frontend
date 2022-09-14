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

import Notifications, {notify} from 'react-notify-toast';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    // const [emailLoading, setEmailLoading] = useState(true);
    // const [sendingEmail, setSendingEmail] = useState(false);

    // componentDidMount = () => {
    //     fetch(`${API_URL}/wake-up`)
    //         .then(res => res.json())
    //         .then(() => {
    //             setEmailLoading(false);
    //         })
    //         .catch(err => console.log(err))
    // }


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
        console.log(process.env.REACT_APP_BACKEND_URL)
       
        if (isLoginMode) {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/login`, 'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }), {
                    'Content-Type': 'application/json'
                });
                auth.login(responseData.userId, responseData.token);
            } catch (err) { }

        } else {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, 'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    });
                console.log(responseData)
                notify.show(responseData.msg,'warning',5000,{background:'blue',color:'white'})
                // auth.login(responseData.userId, responseData.token);
            } catch (err) { }
        }
       
    };
    return (
        <Fragment>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Notifications/>
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Είσοδος</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Όνομα"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Παρακαλώ εισάγετε ένα όνομα."
                            onInput={inputHandler}
                        />
                    )}
                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="E-Mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Παρακαλώ εισάγετε ένα έγκυρο email."
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Κωδικός"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Παρακαλώ εισάγετε έναν έγκυρο κωδικό, τουλάχιστον 5 χαρακτήρες."
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? 'Σύνδεση' : 'Εγγραφή'}
                    </Button>
                </form>
                <span className='button_span'><Button inverse onClick={switchModeHandler}>
                    Εναλλαγή σε {isLoginMode ? 'Εγγραφή' : 'Σύνδεση'}
                </Button></span>
            </Card>
        </Fragment>
    );
};

export default Auth;
