import { Row, Col } from "react-bootstrap";
import FarmakaHit from "./FarmakaHit";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook';
import FarmakaATC from "./FarmakaATC";
import './FarmakoFinder.css'




const FarmakoFinder = (props) => {
    const [selectedHit, setSelectedHit] = useState('');
    const [hitList, setHitList] = useState([])
    const [drugInput, setDrugInput] = useState('');
    const [atcInput, setAtcInput] = useState('');
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();

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

    }, [drugInput, sendRequest, atcInput,auth.token]);

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
           
            <Col className="text-start">
            {(props.therapeia) && <label className="drastiki__ousia">Όνομα Φαρμάκου</label>}
                <input className={`${props.therapeia && 'farmako__finder__input'}`} list="drugNames" name="drugName" id="drugName" value={drugInput} onChange={nameChangeHandler} defaultValue={selectedHit.name} />
                <datalist id="drugNames" >
                    <FarmakaHit hit={hitList} />

                </datalist>
            </Col>
            
            <Col className="text-start">
            {(props.therapeia) && <label className="drastiki__ousia">Δραστική Ουσία</label>}
                <input className={`${props.therapeia && 'farmako__finder__input'}`} list="drugATCs" name="drugATC" id="drugATC" defaultValue={selectedHit.ATC_name} onChange={atcNameChangeHandler} required/>
                <datalist id="drugATCs">
                    <FarmakaATC hit={hitList} />
                </datalist>
            </Col>
            {/* </input> */}
        </Row>
    );
}

export default FarmakoFinder;