import { Container, Row, Col } from "react-bootstrap";
import ErrorModal from "../../UI/ErrorModal";
import {
    Chart,
    LineSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import DefaultMessage from "./DefaultMessage";
import classes from './Biometrics.module.css';
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { PatientContext } from "../../../context/patient-context";
import { useHttpClient } from "../../../hooks/http-hook";

const Biometrics = (props) => {
    const [bmiData, setBmiData] = useState([]);
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { sendRequest, error, clearError } = useHttpClient();
    const [showDefault, setShowDefault] = useState(true)


    useEffect(() => {
        const fetchBiometrics = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/statistics/biometrics`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                if (responseData.BMI_data.length > 0) {
                    setBmiData(responseData.BMI_data)
                    setShowDefault(false)
                }
            } catch (err) { }

        };
        if (!!patientContext.patientId) {
            fetchBiometrics();
        }
    }, [patientContext.patientId, sendRequest])



    return (
        <Fragment>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            {!showDefault && <Row>

                <Col >
                    <Container className={classes.biometrics}>
                            <Chart
                                data={bmiData}
                            >
                                <ArgumentAxis />
                                <ValueAxis />
                                <LineSeries
                                    valueField="bmi"
                                    argumentField="date"
                                />
                                <Title text="BMI" />
                                <Animation />
                            </Chart>
                    </Container>
                </Col>
            </Row>}
            {showDefault && <DefaultMessage message='Δεν υπάρχουν επισκέψεις για την δημιουργία Βιομετρικών Στατιστικών' />}
        </Fragment>
    )
}

export default Biometrics;