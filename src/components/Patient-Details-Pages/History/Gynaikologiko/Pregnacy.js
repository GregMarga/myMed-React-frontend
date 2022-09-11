import { Container, Row, Col } from "react-bootstrap";
import Card from "../../../UI/Card";
import { useContext, useState, useEffect } from "react";
import classes from './Pregnacy.module.css'
import PregnacyForm from "./PregnacyForm";
import PregnaciesList from "./PregnacyList";
import ErrorModal from "../../../UI/ErrorModal";
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";


const Pregnacy = (props) => {
    const [pregnacyList, setPregnaciesList] = useState([]);
    const [addPregnacy, setAddPregnacy] = useState(false);

    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);

    const { error, clearError, sendRequest, isLoading } = useHttpClient();

    useEffect(() => {
        const fetchPregnacies = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/gynaikologiko/pregnacies`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setPregnaciesList(responseData);
            } catch (err) { console.log(err) }

        };
        if (!!patientContext.patientId) {
            fetchPregnacies();
        }
    }, [patientContext.patientId, sendRequest]);


    const addPregnacyHandler = async (pregnacy) => {
        const id = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/gynaikologiko/pregnacy`, 'POST',
                JSON.stringify({
                    _id: id,
                    date_of_birth: pregnacy.date_of_birth,
                    gennisi: pregnacy.gennisi,
                    baby_weight: pregnacy.baby_weight,
                    comments: pregnacy.comments
                })
                , {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            setPregnaciesList((prevState) => {
                return [...prevState, pregnacy];
            })
        } catch (err) {

        }
    }
    const removePregnacyHandler = async (pregnacyIdToDelete) => {

        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/gynaikologiko/pregnacy/${pregnacyIdToDelete}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });

            setPregnaciesList((prevState) => {
                return prevState.filter(pregnacy => {
                    return pregnacy._id !== pregnacyIdToDelete
                })
            })
        } catch (err) { }

    }

    return (
        <Container>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Card className={classes.pregnacyCard}>
                <Row className={classes.pregnacyHeader}>
                    <Col className="text-center">Ημερομηνία</Col>
                    <Col className="text-center">Γέννηση</Col>
                    <Col className="text-center">Βάρος Νεογνού(kg)</Col>
                    <Col className="text-center">Σχόλια</Col>
                    <Col sm={2}></Col>
                </Row>
                {addPregnacy && <PregnacyForm setAddPregnacy={setAddPregnacy} addPregnacyHandler={addPregnacyHandler} />}
                <PregnaciesList removePregnacyHandler={removePregnacyHandler} pregnacyList={pregnacyList} addPregnacy={addPregnacy} />
                <Row>
                    <Col>
                        {((!!props.info && props.editGynaikologiko) || (!props.info)) && <button type='button' onClick={() => { setAddPregnacy(true) }} className={classes.addPregnacy}>Προσθήκη Κύησης</button>}
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default Pregnacy;