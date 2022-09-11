import { Container, Row, Col } from "react-bootstrap";
import Card from "../../../UI/Card";
import SurgeriesList from "./SurgeriesList";
import SurgeriesForm from './SurgeriesForm';
import ErrorModal from "../../../UI/ErrorModal";
import classes from './Surgeries.module.css'
import { useContext, useState, useEffect } from "react";
import { PatientContext } from "../../../../context/patient-context";
import { AuthContext } from "../../../../context/auth-context";
import { useHttpClient } from "../../../../hooks/http-hook";

const Surgeries = (props) => {
    const [surgeriesList, setSurgeriesList] = useState([]);
    const [addSurgery, setAddSurgery] = useState(false);

    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);

    const { error, clearError, sendRequest, isLoading } = useHttpClient();

    useEffect(() => {
        const fetchSurgeries = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/surgeries`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setSurgeriesList(responseData);
            } catch (err) { }

        };
        if (!!patientContext.patientId) {
        fetchSurgeries();
        }
    }, [patientContext.patientId, sendRequest]);


    const openSurgeryFormHandler = (event) => {
        setAddSurgery(true)
    }

    const addSurgeryHandler = async (surgery) => {
        const id = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
        
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/surgery`, 'POST',
                JSON.stringify({
                    _id: id,
                    title: surgery.title,
                    dateOfEntrance: surgery.dateOfEntrance,
                    dateOfExit: surgery.dateOfExit,
                    hospital: surgery.hospital
                })
                , {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            setSurgeriesList((prevState) => {
                return [...prevState, {
                    _id: id,
                    title: surgery.title,
                    dateOfEntrance: surgery.dateOfEntrance,
                    dateOfExit: surgery.dateOfExit,
                    hospital: surgery.hospital
                }];
            })
        } catch (err) {
            console.log(err)
        }
    }

    const removeSurgeryHandler = async (surgeryIdToDelete) => {

        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/surgery/${surgeryIdToDelete}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });

            setSurgeriesList((prevState) => {
                return prevState.filter(surgery => {
                    return surgery._id !== surgeryIdToDelete
                })
            })
        } catch (err) { }

    }

    const editSurgeryHandler = async (addedSurgery, surgeryIdtoUpdate) => {
        setSurgeriesList(prevState => {
            return prevState.map(surgery => {
                if (surgery._id === surgeryIdtoUpdate) {
                    return surgery = {...addedSurgery,_id:surgery._id}
                } else return surgery = surgery
            })
        })

        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/surgery/${surgeryIdtoUpdate}`, 'PATCH',
                JSON.stringify({
                    title: addedSurgery.title,
                    dateOfEntrance: addedSurgery.dateOfEntrance,
                    dateOfExit: addedSurgery.dateOfExit,
                    hospital: addedSurgery.hospital
                })
                , {
                    Authorization: 'Bearer ' + auth.token,
                    'Content-Type': 'application/json'
                });

        } catch (err) { console.log(err) }
    }


    return (
        <Container>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Card className={classes.surgeriesCard}>
                <Row className={classes.surgeryHeader}>
                    <Col className="text-center"   >Τίτλος</Col>
                    <Col className="text-center">Ημ/νια Εισόδου</Col>
                    <Col className="text-center">Ημ/νία Εξόδου</Col>
                    <Col className="text-center" sm={4} md={2}>Νοσοκομείο</Col>
                    <Col sm={2}></Col>
                </Row>
                {addSurgery && <SurgeriesForm setAddSurgery={setAddSurgery} addSurgeryHandler={addSurgeryHandler} />}
                <SurgeriesList editSurgeryHandler={editSurgeryHandler} surgeriesList={surgeriesList} addSurgery={addSurgery} removeSurgeryHandler={removeSurgeryHandler} />
                {!addSurgery && !isLoading && <Row><Col><button onClick={openSurgeryFormHandler} className={classes.surgeryButton}>Προσθήκη Χειρουργείου</button></Col></Row>}
            </Card>
        </Container>
    );
}

export default Surgeries;