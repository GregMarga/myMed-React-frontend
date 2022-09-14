import { Row, Col } from "react-bootstrap";
import ConditionsHits from "./ConditionsHits";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../../../context/auth-context'
import { useHttpClient } from '../../../../hooks/http-hook';





const ConditionsFinder = (props) => {
    const [selectedHit, setSelectedHit] = useState('');
    const [hitList, setHitList] = useState([])
    const [conditionInput, setConditionInput] = useState('');
    const auth = useContext(AuthContext);
    const { sendRequest, error, clearError } = useHttpClient();

    useEffect(() => {
        const fetchConditionHits = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/new/conditions/name/${conditionInput}`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setHitList(responseData);
            } catch (err) { }

        };

        if (conditionInput !== '') {
            fetchConditionHits();
        }


    }, [conditionInput, sendRequest]);

    const nameChangeHandler = (event) => {
        setConditionInput(event.target.value);
        let hit;
        for (let i = 0; i < hitList.length; i++) {

            if (hitList[i].code === event.target.value.split(":")[0]) {       /// find selected
                setSelectedHit(hitList[i]);
                props.setSelectedCondition({ code: hitList[i].code, condition: hitList[i].condition });
                hit = { code: hitList[i].code, condition: hitList[i].condition }

                if (!!props.add) {
                    props.addToSelectedConditionsList(hit)
                    setConditionInput('')
                    props.setAddAllergy(false);
                }
            }

        }

    }


    return (
        <Row>
            <Col>
                <input list="conditionNames" name="conditionName" id="conditionName" value={conditionInput} onChange={nameChangeHandler} required />
                <datalist id="conditionNames" >
                    <ConditionsHits hit={hitList} />
                </datalist>
            </Col>
        </Row>
    );
}

export default ConditionsFinder;