import { Container, Row, Col } from "react-bootstrap";
import Card from '../../../UI/Card'
import classes from './Conditions.module.css'
import ConditionsList from "./ConditionsList";
import { useState } from "react";
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Configure, Highlight, Hits } from 'react-instantsearch-dom';
import Hit from "../Hit";
import ConditionsForm from "./ConditionsForms";
import SaveButton from '../../../UI/SaveButton'


const searchClient = algoliasearch("2BT0WK0XX3", "84f4040eebc1e09a00920164c7d7c301");

const Conditions = (props) => {
    const [conditionsList, setConditionsList] = useState([]);
    const [addCondition, setAddCondition] = useState(false);
    const [showHits, setShowHits] = useState(true);
    const openAddForm = (event) => {
        setAddCondition(!addCondition);
    }

    return (
        <Container fluid>
            <Row><Col className="text-center"><div className={classes.title}><h4>Παθήσεις</h4></div></Col></Row>
            <Card>

                <Row>
                    <Col className="text-center" xs={4}>Πάθηση</Col>
                    <Col className="text-center" xs={1}>Κατάσταση</Col>
                    <Col className="text-center" xs={1}>Σοβαρότητα</Col>
                    <Col className="text-center" xs={2}>Ημερομηνία Διάγνωσης</Col>
                    <Col className="text-center" xs={2}>Ημερομηνία Θεραπείας</Col>
                    <Col xs={1}></Col>
                </Row>
                {addCondition && <ConditionsForm />}
                <ConditionsList addCondition={addCondition} conditionsList={conditionsList} />
                {/* <Col xs={5}>
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
                    </Col> */}
                {/* <Row><SaveButton /></Row> */}
                <Row>
                    <Col><button onClick={openAddForm}>Προσθήκη Πάθησης</button></Col>
                </Row>
                {/* {addCondition && <form>
                    <div>add stuff n shit</div></form>} */}
            </Card>
        </Container>
    );
}

export default Conditions;