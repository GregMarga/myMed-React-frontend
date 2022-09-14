import { Container, Row, Col } from 'react-bootstrap';
import Card from '../../UI/Card';
import FarmakaList from './FarmakaList';
import FarmakaForm from './FarmakaForm';
import ErrorModal from '../../UI/ErrorModal';
import LoadingSpinner from '../../UI/LoadingSpinner'
import { useHttpClient } from '../../../hooks/http-hook';
import { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../../../context/auth-context';
import FarmakaHeader from './FarmakaHeader';
import classes from './Farmaka.module.css';
import { PatientContext } from '../../../context/patient-context';




const Farmaka = (props) => {
    const { sendRequest, isLoadding, error, clearError } = useHttpClient();



    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);



    const [farmakaList, setFarmakaList] = useState([])
    const [addFarmako, setAddFarmako] = useState(false);



    const fetchFarmaka = useCallback(async () => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/farmaka`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            setFarmakaList(responseData.farmakaList)


        } catch (err) { }
    }
    )
    useEffect(() => {
        if (!!patientContext.patientId) {
            fetchFarmaka();
        }
    }, [patientContext.patientId])



    const addFarmakaHandler = (farmako) => {
        setFarmakaList((prevState) => {
            return [...prevState, farmako];
        })
        console.log(farmakaList)
    }


    const removeFarmakoHandler = (farmakoIdToDelete) => {
        setFarmakaList((prevState) => {
            return prevState.filter(farmako => {
                return farmako._id !== farmakoIdToDelete
            })
        })
    }

    const editFarmakoHandler = async (newFarmako, farmakoIdToUpdate) => {
        setFarmakaList(prevState => {
            return prevState.map(farmako => {
                if (farmako._id === farmakoIdToUpdate) {
                    return farmako = { ...farmako, dateOfEnd: newFarmako.dateOfEnd, dateOfStart: newFarmako.dateOfStart }
                } else return farmako = farmako
            })
        })

        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/farmaka/${farmakoIdToUpdate}`, 'PATCH',
                JSON.stringify({
                    dateOfStart: newFarmako.dateOfStart,
                    dateOfEnd: newFarmako.dateOfEnd
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
            <Card className={(props.info) ? classes.farmakaCard2 : classes.farmakaCard}>
                {isLoadding && <LoadingSpinner />}
                <FarmakaHeader />
                {addFarmako && <FarmakaForm addFarmakaHandler={addFarmakaHandler} setAddFarmako={setAddFarmako} />}
                <FarmakaList editFarmakoHandler={editFarmakoHandler} addFarmako={addFarmako} farmakaList={farmakaList} removeFarmakoHandler={removeFarmakoHandler} />

                <Row>
                    {!addFarmako && <Col><button className={classes.addFarmako} onClick={() => { setAddFarmako(true) }}>Προσθήκη Φαρμάκου</button></Col>}
                </Row>
            </Card>

        </Container>
    );
}

export default Farmaka;