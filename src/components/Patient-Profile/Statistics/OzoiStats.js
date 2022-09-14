import { Container, Row, Col } from "react-bootstrap";
import { Plugin } from '@devexpress/dx-react-core';
import {
    Chart,
    LineSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
    Legend,

} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
// import { styled } from '@mui/material/styles';
import classes from './OzoiStats.module.css';
import DefaultMessage from "./DefaultMessage";
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { PatientContext } from "../../../context/patient-context";
import { useHttpClient } from "../../../hooks/http-hook";


const OzoiStats = (props) => {
    const [showDefault, setShowDefault] = useState(true)

    const [ozoiData, setOzoiData] = useState([]);
    const [namesList, setNamesList] = useState([])
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { sendRequest, error, clearError } = useHttpClient()


    useEffect(() => {
        const fetchOzoiStats = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/patients/${patientContext.patientId}/statistics/ozoi`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                console.log(responseData)
                if (responseData.ozosData.length>0){
                setOzoiData(responseData.ozosData)
                setNamesList(responseData.namesList)
                setShowDefault(false)
            }

            } catch (err) { }

        };
        if (!!patientContext.patientId) {
            fetchOzoiStats();
        }
    }, [patientContext.patientId, sendRequest])
    console.log(ozoiData)

    return (
        <Fragment>
            {!showDefault && <Row>
                <Col>
                    <Container className={classes.biometrics}>
                            <Chart
                                data={ozoiData}
                                className={classes.chart}
                            >
                                <ArgumentAxis />
                                <ValueAxis />
                                <Plugin name='oz'>
                                    {namesList.length > 0 && ozoiData.length > 0 && namesList.map(ozos => {
                                        console.log(`${ozos}volume`, `${ozos}date`)
                                        return (<LineSeries
                                            name={ozos}
                                            valueField={`${ozos}volume`}
                                            argumentField={`${ozos}date`}
                                            key={ozos}
                                        />)
                                    })}
                                </Plugin>
                                <Legend position="bottom" />
                                <Title text="Όγκος Όζων" />
                                <Animation />
                            </Chart>
                    </Container>
                </Col>
            </Row>}
            {showDefault && <DefaultMessage message='Δεν υπάρχουν καταγεγραμμένοι Όζοι για την δημιουργία Στατιστικών' />}

        </Fragment>
    )
}

export default OzoiStats;