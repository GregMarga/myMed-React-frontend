import { Fragment, useContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Card from "../../../UI/Card";
import KlironomikoLoaded from '../../../Patient-Details-Pages/History/Klironomiko/KlironomikoLoaded';
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";
import classes from './Klironomiko.module.css'



const AllergiesInfo = (props) => {
    const [cleronomicalList, setCleronomicalList] = useState([])
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { isLoading, error, clearError, sendRequest } = useHttpClient()


    const checkIfInList = (selectedName) => {
        let res = false;
        cleronomicalList.map(allergy => {
            if (allergy.name === selectedName) {
                return res = true
            }
        })
        return res;
    }
    const addToCleronomicalList = async (allergyName) => {
        const responseData = await sendRequest(`http://localhost:5000/patients/630ce238394ce3043ab038c8/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });

        setCleronomicalList((prevState) => {

            if (!checkIfInList(allergyName)) {

                return [...prevState, { name: allergyName, _id: responseData }]
            }
            else return [...prevState];
        })
    }
    const removeFromCleronomicalList = (allergyName) => {
        setCleronomicalList((prevState) => {
            return prevState.filter((allergy) => {
                return allergy.name !== allergyName
            })
        })
    }


    useEffect(() => {
        const fetchAllergies = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/klironomiko`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                console.log(responseData)
                setCleronomicalList(responseData.klironomiko)
            } catch (err) { }

        };
        if (!!patientContext.patientId) {
            fetchAllergies();
        }
    }, [patientContext.patientId]);

    return (
        <Container>
            <Card className={classes.allergiesCard}>
                <KlironomikoLoaded cleronomicalList={cleronomicalList} removeFromCleronomicalList={removeFromCleronomicalList} addToCleronomicalList={addToCleronomicalList} />
                {/* <a href={file}  target="_self">mona sept</a> */}
            </Card>
        </Container>
    )
}

export default AllergiesInfo;