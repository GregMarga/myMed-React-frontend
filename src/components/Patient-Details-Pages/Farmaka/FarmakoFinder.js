import { Row, Col } from "react-bootstrap";
// import algoliasearch from 'algoliasearch/lite';
// import { InstantSearch, SearchBox, Configure, Hits } from 'react-instantsearch-dom';
import FarmakaHit from "./FarmakaHit";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook';
import FarmakaATC from "./FarmakaATC";

// const searchClient = algoliasearch("G7C4EARD5F", "0a3dc741ec2f575b4d9fd73eba270ded");


const FarmakoFinder = (props) => {
    const [showHits, setShowHits] = useState(true);
    const [selectedHit, setSelectedHit] = useState('');
    const [hitList, setHitList] = useState([])
    const [drugInput, setDrugInput] = useState('');
    const [atcInput, setAtcInput] = useState('');
    const auth = useContext(AuthContext);
    const { sendRequest, error, clearError } = useHttpClient();

    useEffect(() => {
        const fetchNameHits = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/new/farmako/name/${drugInput}`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setHitList(responseData);
            } catch (err) { }

        };
        const fetchATCNameHits = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/new/farmako/ATC_name/${atcInput}`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setHitList(responseData);
            } catch (err) { }

        };
        if (drugInput !== '') {
            fetchNameHits();
        }
        if (atcInput !== '') {
            fetchATCNameHits();
        }

    }, [drugInput, sendRequest, atcInput]);

    const nameChangeHandler = (event) => {
        setDrugInput(event.target.value);
        for (let i = 0; i < hitList.length; i++) {

            if (hitList[i].name === event.target.value) {
                setSelectedHit(hitList[i]);
                props.setSelectedFarmako({ name: hitList[i].name, ATC_name: hitList[i].ATC_name });
            }
        }
        console.log('selectedHit:', selectedHit)
    }
    const atcNameChangeHandler = (event) => {
        setAtcInput(event.target.value)
        console.log(event.target.value, atcInput)
        for (let i = 0; i < hitList.length; i++) {
            console.log(hitList[i].ATC_name, event.target.value);
            if (hitList[i].ATC_name === event.target.value) {
                setSelectedHit(hitList[i]);
                props.setSelectedFarmako((prevState) => {
                    return { ...prevState, ATC_name: hitList[i].ATC_name }
                });
            }
        }
        // console.log('selectedHit:', selectedHit)
    }

    return (
        <Row>
            <Col>
                <input list="drugNames" name="drugName" id="drugName" value={drugInput} onChange={nameChangeHandler} defaultValue={selectedHit.name} />
                <datalist id="drugNames" >
                    <FarmakaHit hit={hitList} />

                </datalist>
            </Col>
            <Col>
                <input list="drugATCs" name="drugATC" id="drugATC" defaultValue={selectedHit.ATC_name} onChange={atcNameChangeHandler} />
                <datalist id="drugATCs">
                    <FarmakaATC hit={hitList} />
                </datalist>
            </Col>
            {/* </input> */}
        </Row>
    );
}

export default FarmakoFinder;