import { Container, Row, Col } from "react-bootstrap";
import Card from '../../../UI/Card'
import classes from './Conditions.module.css'
import ConditionsList from "./ConditionsList";
import { useContext, useState, useEffect } from "react";
import ConditionsForm from "./ConditionsForms";
import ConditionsHeader from './ConditionsHeader'
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";
import ErrorModal from "../../../UI/ErrorModal";
import LoadingSpinner from "../../../UI/LoadingSpinner";



const Conditions = (props) => {
    const [conditionsList, setConditionsList] = useState([]);
    const [addCondition, setAddCondition] = useState(false);
    const openAddForm = (event) => {
        setAddCondition(true);
    }

    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { error, clearError, isLoading, sendRequest } = useHttpClient();

    useEffect(() => {
        setConditionsList((!!props.conditionsList) ? props.conditionsList : []);
    }, [props.conditionsList])

    useEffect(() => {
        const fetchConditions = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/conditions`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setConditionsList(responseData);
            } catch (err) { }

        };
        // if (!!patientContext.patientId) {
        if (!props.profil && !!patientContext.patientId) {
            fetchConditions();
        }
        // }
    }, [patientContext.patientId, sendRequest, props.profil]);


    const addConditionHandler = async (condition) => {
        try {
            await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/condition`, 'POST',
                JSON.stringify({
                    _id: condition._id,
                    name: condition.name,
                    status: condition.status,
                    dateOfDiagnosis: condition.dateOfDiagnosis,
                    dateOfHealing: condition.dateOfHealing
                })
                , {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            setConditionsList((prevState) => {
                return [...prevState, condition];
            })

        } catch (err) {
            console.log(err)
        }



    }

    const removeConditionHandler = async (conditionIdToDelete) => {
        try {
            await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/condition/${conditionIdToDelete}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });

            setConditionsList((prevState) => {
                return prevState.filter(condition => {
                    return condition._id !== conditionIdToDelete
                })
            })
        } catch (err) { }

    }

    const editConditionHandler = async (addedCondition, conditionIdtoUpdate) => {
        setConditionsList(prevState => {
            return prevState.map(condition => {
                if (condition._id === conditionIdtoUpdate) {
                    return condition = addedCondition
                } else return condition = condition
            })
        })
        console.log(addedCondition.status)
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/${conditionIdtoUpdate}`, 'PATCH',
                JSON.stringify({
                    status: addedCondition.status,
                    dateOfDiagnosis: addedCondition.dateOfDiagnosis,
                    dateOfHealing: addedCondition.dateOfHealing
                })
                , {
                    Authorization: 'Bearer ' + auth.token,
                    'Content-Type': 'application/json'
                });

        } catch (err) { console.log(err) }
    }


    return (
        <Container >
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            {!props.profil && <Row><Col className="text-center"><div className={classes.title}><h4>Παθήσεις</h4></div></Col></Row>}
            <Card className={classes.conditionsCard}>
                {isLoading && <LoadingSpinner />}
                <ConditionsHeader />

                {addCondition && <ConditionsForm setAddCondition={setAddCondition} addConditionHandler={addConditionHandler} />}
                <ConditionsList addCondition={addCondition} conditionsList={conditionsList} editConditionHandler={editConditionHandler} removeConditionHandler={removeConditionHandler} />

                <Row>
                    <Col>
                        {!addCondition && <button className={classes.addCondition} onClick={openAddForm}>Προσθήκη Πάθησης</button>}
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default Conditions;