import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import Card from "../../../UI/Card";
import classes from './Gynaikologiko.module.css'
import Gynaikologiko from '../../../Patient-Details-Pages/History/Gynaikologiko/Gynaikologiko'
import ErrorModal from "../../../UI/ErrorModal";
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";


const GynaikologikoInfo = (props) => {
    const [pregnacyList, setPregacyList] = useState([])
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { error,  sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchGynaikologiko = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/gynaikologiko`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                console.log(responseData)
                setPregacyList(responseData.pregnacyList)
            } catch (err) { }

        };
        if (!!patientContext.patientId) {
            fetchGynaikologiko();
        }
    }, [patientContext.patientId, sendRequest]);

    return (
        <Container>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Card className={classes.gynaikologikoCard}>
                <Gynaikologiko pregnacyList={pregnacyList} setPregacyList={setPregacyList} />
            </Card>
        </Container>
    )
}

export default GynaikologikoInfo;