import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Configure, Highlight, Hits } from 'react-instantsearch-dom';
import Hit from "../History/Hit";
import { Container, Row, Col } from 'react-bootstrap';
import SaveButton from '../../UI/SaveButton'
import { useHttpClient } from '../../../hooks/http-hook';
import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../../context/auth-context';

const searchClient = algoliasearch("2BT0WK0XX3", "84f4040eebc1e09a00920164c7d7c301");

const Farmaka = () => {
    const { sendRequest, isLoadding, error, clearError } = useHttpClient();
    const testInputRef = useRef();
    const auth = useContext(AuthContext)

    const submitHandler = async (event) => {
        console.log('submitting')
        console.log(testInputRef.current.value)
        const responseData = await sendRequest(`http://localhost:5000/patients/new/farmaka`, 'POST',
            JSON.stringify({
                test: testInputRef.current.value
            }), {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token
        }
        )
    }
    return (
        <Container>

            <InstantSearch indexName="conditions" searchClient={searchClient}>
                <Configure hitsPerPage={5} />
                <SearchBox
                    onSubmit={event => {
                        event.preventDefault();
                        console.log('lets see')
                        console.log(event.currentTarget);
                    }}
                    onReset={event => {
                        console.log(event.currentTarget);
                    }}
                />

            </InstantSearch>
            <input ref={testInputRef} type='file'/>
            <SaveButton onClick={submitHandler} />

        </Container>
    );
}

export default Farmaka;