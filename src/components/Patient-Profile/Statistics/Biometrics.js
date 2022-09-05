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
import classes from './Biometrics.module.css';
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { PatientContext } from "../../../context/patient-context";
import { useHttpClient } from "../../../hooks/http-hook";

const Biometrics = (props) => {
    const [bmiData, setBmiData] = useState([]);
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { sendRequest, error, clearError } = useHttpClient()
   

    useEffect(() => {
        const fetchBiometrics = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/statistics/biometrics`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                setBmiData(responseData.BMI_data)
            } catch (err) { }

        };
        if (!!patientContext.patientId) {
            fetchBiometrics();
        }
    }, [patientContext.patientId, sendRequest])



    return (
        <Fragment>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Row>

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
            </Row>
        </Fragment>
    )
}

export default Biometrics;