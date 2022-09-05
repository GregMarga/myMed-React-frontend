import { Container, Row, Col } from "react-bootstrap";
import Paper from '@mui/material/Paper';
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
import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import { PatientContext } from "../../../context/patient-context";
import { useHttpClient } from "../../../hooks/http-hook";


const OzoiStats = (props) => {
    // const StyledChart = styled(Chart)(() => ({
    //     [`&.${classes.chart}`]: {
    //         paddingRight: '20px',
    //     },
    // }));
    const [ozoiData, setOzoiData] = useState([]);
    const [namesList, setNamesList] = useState([])
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { sendRequest, error, clearError } = useHttpClient()


    useEffect(() => {
        const fetchOzoiStats = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/statistics/ozoi`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                console.log(responseData)
                setOzoiData(responseData.ozosData)
                setNamesList(responseData.namesList)
            } catch (err) { }

        };
        if (!!patientContext.patientId) {
            fetchOzoiStats();
        }
    }, [patientContext.patientId, sendRequest])
    console.log(ozoiData)

    return (
        <Fragment>
            <Row>
                <Col>
                    <Container className={classes.biometrics}>
                        <Paper>
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

                                {/* <LineSeries
                                    name='01'
                                    valueField="01volume"
                                    argumentField="01date"
                                />

                                <LineSeries
                                    name='o2'
                                    valueField="o2volume"
                                    argumentField="o2date"
                                /> */}
                                <Legend position="bottom" />
                                <Title text="Όγκος Όζων" />
                                <Animation />
                            </Chart>


                        </Paper>
                    </Container>
                </Col>
            </Row>
        </Fragment>
    )
}

export default OzoiStats;