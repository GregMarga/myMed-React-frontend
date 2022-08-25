import { Row, Col } from "react-bootstrap";
import ConditionsHits from "./ConditionsHits";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../../../context/auth-context'
import { useHttpClient } from '../../../../hooks/http-hook';





const ConditionsFinder = (props) => {
    const [showHits, setShowHits] = useState(true);
    const [selectedHit, setSelectedHit] = useState('');
    const [hitList, setHitList] = useState([])
    const [conditionInput, setConditionInput] = useState('');
    const auth = useContext(AuthContext);
    const { sendRequest, error, clearError } = useHttpClient();

    useEffect(() => {
        const fetchConditionHits = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/new/conditions/name/${conditionInput}`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setHitList(responseData);
            } catch (err) { }

        };
       
        if (conditionInput !== '') {
            fetchConditionHits();
        }


    }, [conditionInput, sendRequest]);

    const nameChangeHandler = (event) => {
        setConditionInput(event.target.value);
        for (let i = 0; i < hitList.length; i++) {

            if (hitList[i].code === event.target.value.split(":")[0]) {
                setSelectedHit(hitList[i]);
                props.setSelectedCondition({ code: hitList[i].code, condition: hitList[i].condition });
            }
        }
        console.log('selectedHit:', selectedHit)
    }
    

    return (
        <Row>
            <Col>
                <input list="conditionNames" name="conditionName" id="conditionName" value={conditionInput} onChange={nameChangeHandler}  />
                <datalist id="conditionNames" >
                    <ConditionsHits hit={hitList} />
                </datalist>
            </Col>
        </Row>
    );
}

export default ConditionsFinder;