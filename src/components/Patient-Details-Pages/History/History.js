import { Container, Col, Row } from "react-bootstrap";
import './History.css';
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useHttpClient } from "../../../hooks/http-hook";
import { useState, useEffect, useRef, useContext, Fragment } from "react";
import ErrorModal from "../../UI/ErrorModal";
import { AuthContext } from "../../../context/auth-context";
import Collapsible from 'react-collapsible';
import Conditions from "./Atomiko/Conditions";
import Allergies from "./Atomiko/Allergies/Allergies";
import Klironomiko from "./Klironomiko/Klironomiko";
import Surgeries from "./Surgeries/Surgeries";
import Gynaikologiko from "./Gynaikologiko/Gynaikologiko";
import { PatientContext } from "../../../context/patient-context";
import { useParams } from "react-router-dom";


const History = (props) => {
    const { isLoading, sendRequest, error, clearError } = useHttpClient();

    const [conditionsList, setConditionsList] = useState([]);
    const [allergiesList, setAllergiesList] = useState([]);
    const [cleronomicalList, setCleronomicalList] = useState([]);
    const [surgeriesList, setSurgeriesList] = useState([]);
    const [pregnacyList, setPregnaciesList] = useState([]);
    const [gynaikologikoList, setGynaikologikoList] = useState({ emminarxi: null, stability: null, cycle_duration: null, period_duration: null, maieutiko: [], adk: null, tdk: null })


    const paramsId = useParams().patientId;



    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const emminarxiInputRef = useRef();
    const stabilityInputRef = useRef();
    const emminopausiInputRef = useRef();
    const period_durationInputRef = useRef();
    const cycle_durationInputRef = useRef();
    const adkInputRef = useRef();
    const tdkInputRef = useRef();





    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko/female`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                console.log(responseData)
                setConditionsList(responseData.conditionsList);
                setSurgeriesList(responseData.surgeries);
                setPregnaciesList(responseData.maieutiko);
                setCleronomicalList(responseData.cleronomicalList)
                responseData.allergies.map(allergy => {
                    setAllergiesList((prevState) => {
                        return [...prevState, allergy]
                    });
                })

                setGynaikologikoList(responseData.gynaikologiko)
                console.log(responseData)
            } catch (err) { }

        };
        if (!!patientContext.anamnistikoId) {
            fetchHistory();
        }
    }, []);





    const submitHandler = async (event) => {
        event.preventDefault();
        console.log('submit')
        try {
            const responseDate = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko`, 'POST',
                JSON.stringify({
                    allergies: allergiesList,
                    cleronomical: cleronomicalList,
                    conditions: conditionsList,
                    surgeries: surgeriesList,
                    gynaikologiko: {
                        emminarxi: emminarxiInputRef.current.value,
                        stability: stabilityInputRef.current.value,
                        cycle_duration: cycle_durationInputRef.current.value,
                        period_duration: period_durationInputRef.current.value,
                        emminopausi: emminopausiInputRef.current.value,
                        pregnacyList: pregnacyList,
                        adk: adkInputRef.current.checked,
                        tdk: tdkInputRef.current.checked,
                    }

                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
            console.log(responseDate)
            patientContext.createAnamnistikoId(responseDate._id)

        } catch (err) { }
    }

    const updateHandler = async (event) => {
        event.preventDefault();

        try {
            await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/anamnistiko`, 'PATCH',
                JSON.stringify({
                    allergies: allergiesList,
                    cleronomical: cleronomicalList,
                    conditions: conditionsList,
                    surgeries: surgeriesList,
                    gynaikologiko: {
                        emminarxi: emminarxiInputRef.current.value,
                        stability: stabilityInputRef.current.value,
                        cycle_duration: cycle_durationInputRef.current.value,
                        period_duration: period_durationInputRef.current.value,
                        emminopausi: emminopausiInputRef.current.value,
                        pregnacyList: pregnacyList,
                        adk: adkInputRef.current.checked,
                        tdk: tdkInputRef.current.checked,
                    }


                }), {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            });
        } catch (err) { }
    }

    return (
        <Fragment>
            {isLoading && <LoadingSpinner />}
            {!!error && <ErrorModal error={error} onClear={clearError} />}

            {/* <form className='history' onSubmit={(!patientContext.anamnistikoId) ? submitHandler : updateHandler}> */}
            <Container fluid className='history'>
                <Collapsible trigger='Ατομικό >' triggerWhenOpen={'Ατομικό ^'} transitionTime={200}>
                    <Conditions />
                    <Allergies allergiesList={allergiesList} setAllergiesList={setAllergiesList} />
                </Collapsible>
                <Collapsible trigger='Κληρονομικό >' triggerWhenOpen={'Κληρονομικό ^'} transitionTime={200}>
                    <Klironomiko cleronomicalList={cleronomicalList} setCleronomicalList={setCleronomicalList} />
                </Collapsible>
                <Collapsible trigger='Χειρουργεία >' triggerWhenOpen={'Χειρουργεία ^'} transitionTime={200}>
                    <Surgeries surgeriesList={surgeriesList} setSurgeriesList={setSurgeriesList} />
                </Collapsible>
                {(patientContext.gender === 'female') && <Collapsible trigger='Γυναικολογικό >' triggerWhenOpen={'Γυναικολογικό ^'} transitionTime={200}>
                    <Container>
                        <Gynaikologiko />
                    </Container>
                </Collapsible >}
            </Container>
        </Fragment>
    );
}

export default History;