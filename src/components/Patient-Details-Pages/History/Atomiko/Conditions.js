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
import DeleteConditionsModal from "../../../UI/DeleteConditionsModal";



const Conditions = (props) => {
    const [conditionsList, setConditionsList] = useState([]);
    const [addCondition, setAddCondition] = useState(false);
    const [selectedConditionId, setSelectedConditionId] = useState()
    const openAddForm = (event) => {
        setAddCondition(true);
    }
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);


    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { error, clearError, isLoading, sendRequest } = useHttpClient();

    useEffect(() => {
        setConditionsList((!!props.conditionsList) ? props.conditionsList : []);
    }, [props.conditionsList])

    useEffect(() => {
        const fetchConditions = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/anamnistiko/conditions`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setConditionsList(responseData);
            } catch (err) { }

        };
        // if (!!patientContext.patientId) {
        if (!props.profil && !!patientContext.patientId) {
            fetchConditions();
        }
        // }
    }, [patientContext.patientId, sendRequest, props.profil]);


    const openDeleteModal = (id) => {
        setDeleteModalIsOpen(true);
        setSelectedConditionId(id);
    }

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false)
    }

    const addConditionHandler = async (condition) => {
        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/anamnistiko/condition`, 'POST',
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

    const removeConditionHandler = async () => {
        try {
            setDeleteModalIsOpen(false);
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/anamnistiko/condition/${selectedConditionId}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });

            setConditionsList((prevState) => {
                return prevState.filter(condition => {
                    return condition._id !== selectedConditionId
                })
            })

        } catch (err) { }

    }

    const editConditionHandler = async (addedCondition, conditionIdtoUpdate) => {


        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/conditions/${conditionIdtoUpdate}`, 'PATCH',
                JSON.stringify({
                    status: addedCondition.status,
                    dateOfDiagnosis: addedCondition.dateOfDiagnosis,
                    dateOfHealing: addedCondition.dateOfHealing
                })
                , {
                    Authorization: 'Bearer ' + auth.token,
                    'Content-Type': 'application/json'
                });

            setConditionsList(prevState => {
                return prevState.map(condition => {
                    if (condition._id === conditionIdtoUpdate) {
                        return condition = addedCondition
                    } else return condition = condition
                })
            })

        } catch (err) { console.log(err) }
    }


    return (
        <Container >
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            {!props.profil && <Row><Col className="text-center"><div className={classes.title}><h4>Παθήσεις</h4></div></Col></Row>}
            {deleteModalIsOpen && <DeleteConditionsModal onConfirm={removeConditionHandler} onCancel={closeDeleteModal} description={'Για να επιβεβαιώσετε τη διαγραφή πληκτρολόγηστε το νούμερο:'} title='Διαγραφή Πάθησης' />}

            <Card className={classes.conditionsCard}>
                {isLoading && <LoadingSpinner />}
                <ConditionsHeader />

                {addCondition && <ConditionsForm setAddCondition={setAddCondition} addConditionHandler={addConditionHandler} />}
                <ConditionsList addCondition={addCondition} conditionsList={conditionsList} editConditionHandler={editConditionHandler} openDeleteModal={openDeleteModal} removeConditionHandler={removeConditionHandler} />

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