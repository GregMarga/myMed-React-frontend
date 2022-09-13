import { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../../../../UI/Card";
import classes from './Ozoi.module.css';
import OzoiHeader from "./OzoiHeader";
import OzosForm from "./OzosForm";
import OzoiList from "./OzoiList";
import { AuthContext } from "../../../../../context/auth-context";
import { PatientContext } from "../../../../../context/patient-context";
import { useHttpClient } from "../../../../../hooks/http-hook";
import ErrorModal from "../../../../UI/ErrorModal";
import LoadingSpinner from "../../../../UI/LoadingSpinner";


const Ozoi = (props) => {
    const [ozosList, setOzosList] = useState([]);
    const [addOzos, setAddOzos] = useState(false);

    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);

    const { error, clearError, isLoading, sendRequest } = useHttpClient();

    useEffect(() => {

        const fetchOzoi = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/visit/${patientContext.visitId}/ozos`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                
                setOzosList((prevState) => {
                    return prevState.concat(responseData)
                });

            } catch (err) { console.log(err) }

        };

        const fetchPreviousOzoi = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/visit/previousOzos`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
               
                setOzosList(responseData);

            } catch (err) { console.log(err) }

        };

        if (!!patientContext.visitId && patientContext.visitId !== 'new') {
            fetchOzoi();
        }
        // if (patientContext.visitId === 'new') {
        //     fetchPreviousOzoi();
        // }

    }, [patientContext.visitId, sendRequest]);

    const addOzosHandler = async (ozos) => {
        const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
        ozos._id = responseData;

        try {
            await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/visit/${patientContext.visitId}/ozos`, 'POST',
                JSON.stringify({
                    name: ozos.name,
                    length: ozos.depth,
                    height: ozos.depth,
                    depth: ozos.depth,
                    dateOfFinding: ozos.dateOfFinding,
                    _id: responseData

                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            setOzosList((prevState) => {
                return [...prevState, ozos];
            })

        } catch (err) { }
    }


    const removeOzosHandler = async (ozosIdToDelete) => {
        try {
            await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/visit/${patientContext.visitId}/ozos/${ozosIdToDelete}`, 'DELETE', null, { Authorization: 'Bearer ' + auth.token });

            setOzosList((prevState) => {
                return prevState.filter(ozos => {
                    return ozos._id !== ozosIdToDelete
                })
            })
        } catch (err) { }


    }

    const editOzosHanlder = async (addedOzos, ozosIdtoUpdate) => {
        setOzosList(prevState => {
            return prevState.map(ozos => {
                if (ozos._id === ozosIdtoUpdate) {
                    return ozos = addedOzos
                } else { return ozos = ozos }
            })
        })
        try {
            const responseData = await sendRequest(`http://localhost:5000/patients/631889e05aa8e7970c0e6155/visit/${patientContext.visitId}/ozos/${ozosIdtoUpdate}`, 'PATCH',
                JSON.stringify({
                    length: addedOzos.length,
                    height: addedOzos.height,
                    depth: addedOzos.depth,
                    dateOfFinding: addedOzos.dateOfFinding
                })
                , {
                    Authorization: 'Bearer ' + auth.token,
                    'Content-Type': 'application/json'
                });

        } catch (err) { console.log(err) }
    }



    return (
        <Container>
            {(!!error) && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner />}
            <Row>
                <Col className="text-center"> <span className={classes.subtitle}>Υπερηχογράφημα Θυρεοειδούς</span></Col>
            </Row>
            <Card className={classes.ozoiCard}>
                <OzoiHeader />
                {addOzos && <OzosForm addOzosHandler={addOzosHandler} setAddOzos={setAddOzos} />}
                <OzoiList addOzos={addOzos} ozosList={ozosList} removeOzosHandler={removeOzosHandler} editOzosHanlder={editOzosHanlder} />

                <Row>
                    {!addOzos && <Col><button className={classes.addOzos} onClick={() => { setAddOzos(true) }}>Προσθήκη Όζου</button></Col>}
                </Row>
            </Card>

        </Container>
    );
}

export default Ozoi;
