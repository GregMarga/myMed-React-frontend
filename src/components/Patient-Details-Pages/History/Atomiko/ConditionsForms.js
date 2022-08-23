import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef } from "react";
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Configure, Highlight, Hits } from 'react-instantsearch-dom';
import SmallSaveButton from "../../../UI/SmallSaveButton";
import SmallDeleteButton from "../../../UI/SmallDeleteButton"
import Hit from "../Hit";
import classes from './ConditionsForm.module.css';

const searchClient = algoliasearch("2BT0WK0XX3", "84f4040eebc1e09a00920164c7d7c301");

const ConditionsForm = () => {
    const [showHits, setShowHits] = useState(true);

    const stateInputRef = useRef();
    const severityInputRef = useRef();
    const dateOfDiagnosisInputRef = useRef();
    const dateOfHealingInputRef = useRef();

    const submitHandler = (event) => {
        console.log(stateInputRef.current.value);
    }

    return (
        
            <Row className={classes.conditionsForm}>
                <Col sm={4}>
                    <InstantSearch indexName="conditions" searchClient={searchClient}>
                        <Configure hitsPerPage={5} />
                        <SearchBox
                            onSubmit={event => {
                                event.preventDefault();
                                console.log('lets see')
                                setShowHits(true)
                            }}
                            // searchAsYouType={false}
                            onReset={event => {
                                setShowHits(false)
                                console.log(event.currentTarget);
                            }}
                            translations={{
                                submitTitle: 'Υποβάλλετε.',
                                resetTitle: 'Καθαρίστε το ερώτημα.',
                                placeholder: 'Αναζητήστε εδώ...'
                            }}
                        />
                        {showHits && <Hits hitComponent={Hit} />}
                    </InstantSearch>
                </Col>
                <Col sm={1} className='text-center'>
                    {/* <label>Κατάσταση</label> */}
                    <select ref={stateInputRef}>
                        <option>Σταθερή</option>
                        <option>Υποτροπίαση</option>
                        <option>Χρόνια</option>
                    </select>
                </Col>
                <Col sm={1} className='text-center'>
                    {/* <label>Σοβαρότητα</label> */}
                    <select ref={severityInputRef}>
                        <option>Υψηλή</option>
                        <option>Μέτρια</option>
                        <option>Χαμηλή</option>
                    </select>
                </Col>
                <Col sm={2}><input type='date' ref={dateOfDiagnosisInputRef} /></Col>
                <Col sm={2}><input type='date' ref={dateOfHealingInputRef} /></Col>
                <Col className='text-start' sm={1}>
                    <SmallSaveButton onClick={submitHandler} />
                    <SmallDeleteButton onClick={() => { }} />
                </Col>
            </Row>
       
    );
}

export default ConditionsForm;