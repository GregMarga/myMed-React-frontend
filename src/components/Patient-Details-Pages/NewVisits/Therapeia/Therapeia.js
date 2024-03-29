import { Container, Row, Col } from "react-bootstrap";
import Card from '../../../UI/Card'
import classes from './Therapeia.module.css'
import TherapeiaList from "./TherapeiaList";
import TherapeiaForm from "./TherapeiaForm";
import ErrorModal from '../../../UI/ErrorModal';
import LoadingSpinner from '../../../UI/LoadingSpinner';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";


const Therapeia = (props) => {
    const [addTherapeia, setAddTherapeia] = useState(false);

    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);

    const { error, sendRequest, isLoading, clearError } = useHttpClient();

    useEffect(() => {
        const fetchTherapeia = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/631889e05aa8e7970c0e6155/visit/${patientContext.visitId}/therapeia`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                props.dispatch({ type: 'loadTherapeiaList', payload: { loadedTherapeiaList: responseData } })
                props.dispatch({ type: 'oldTherapeia', payload: { oldTherapeia: true } })


            } catch (err) { console.log(err) }

        };
        if (!!patientContext.visitId && patientContext.visitId !== 'new') {
            fetchTherapeia();
        }

    }, [patientContext.visitId, sendRequest]);

    const openAddForm = (event) => {
        setAddTherapeia(true);
        props.dispatch({ type: 'touchTherapeia', payload: { touchTherapeiaForm: true } })
    }

    const addTherapeiaHandler = async (newTherapeia) => {
        const therapeiaId = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });

        try {
            props.dispatch({ type: 'addTherapeiaList', payload: { therapeia: { ...newTherapeia, _id: therapeiaId } } })
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/visit/${patientContext.visitId}/therapeia`, 'POST',
                JSON.stringify({
                    _id: therapeiaId,
                    posotita: newTherapeia.posotita,
                    syxnotita: newTherapeia.syxnotita,
                    ATC_name: newTherapeia.ATC_name,
                    condition: newTherapeia.condition,
                    name: newTherapeia.name,
                    duration: newTherapeia.duration
                })
                , {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
        } catch (err) { console.log(err) }
    }
    const removeTherapeiaHandler = async (therapeiaIdToDelete) => {
        let therapeiaList = props.state.therapeiaList.filter(therapeia => {
            return therapeia._id !== therapeiaIdToDelete
        })

        try {
            props.dispatch({ type: 'removeTherapeiaList', payload: { therapeiaList: therapeiaList } })

            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/visit/${patientContext.visitId}/therapeia/${therapeiaIdToDelete}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });
        } catch (err) { }

    }

    const editTherapeiaHandler = async (newTherapeia, therapeiaId) => {
        let tempList = props.state.therapeiaList;
        tempList = tempList.map(therapeia => {
            if (therapeia._id === therapeiaId) {
                return therapeia = newTherapeia
            } else { return therapeia = therapeia }
        })
        props.dispatch({ type: 'editTherapeiaList', payload: { therapeiaList: tempList } })

        // try {
        //     await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/visit/${patientContext.visitId}/therapeia/${therapeiaId}`, 'PATCH',
        //         JSON.stringify({
        //             posotita: newTherapeia.posotita,
        //             syxnotita: newTherapeia.syxnotita,
        //             duration: newTherapeia.duration
        //         })
        //         , {
        //             'Content-Type': 'application/json',
        //             Authorization: 'Bearer ' + auth.token
        //         }
        //     );
        // } catch (err) { console.log(err) }
    }


    return (
        <Container>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Card className={classes.therapeiaCard}>
                {isLoading && <LoadingSpinner />}
                <TherapeiaList editTherapeiaHandler={editTherapeiaHandler} touchForm={props.state.touchTherapeiaForm} loadedTherapeiaList={props.loadedTherapeiaList} therapeiaList={props.therapeiaList} oldTherapeia={props.state.oldTherapeia} dispatch={props.dispatch} addTherapeia={addTherapeia} removeTherapeiaHandler={removeTherapeiaHandler} />
                <Row>
                    <Col>
                        {addTherapeia && <TherapeiaForm addTherapeia={addTherapeia} addTherapeiaHandler={addTherapeiaHandler} diagnosisList={props.diagnosisList} setAddTherapeia={setAddTherapeia} />}
                        {!addTherapeia && <button className={classes.addCondition} onClick={openAddForm}>Προσθήκη Θεραπείας</button>}
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default Therapeia;