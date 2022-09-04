import { Fragment, useContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Card from "../../../UI/Card";
import AllergiesLoaded from "../../../Patient-Details-Pages/History/Atomiko/Allergies/AllergiesLoaded";
import { AuthContext } from "../../../../context/auth-context";
import { PatientContext } from "../../../../context/patient-context";
import { useHttpClient } from "../../../../hooks/http-hook";
import classes from './AllergiesInfo.module.css'


const AllergiesInfo = (props) => {
    const [allergiesList, setAllergiesList] = useState([])
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext);
    const { isLoading, error, clearError, sendRequest } = useHttpClient()


    const checkIfInList = (selectedName) => {
        let res = false;
        allergiesList.map(allergy => {
            if (allergy.name === selectedName) {
                return res = true
            }
        })
        return res;
    }
    const addToAllergyList = async (allergyName) => {
        const responseData = await sendRequest(`http://localhost:5000/patients/630ce238394ce3043ab038c8/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });

        setAllergiesList((prevState) => {

            if (!checkIfInList(allergyName)) {

                return [...prevState, { name: allergyName, _id: responseData }]
            }
            else return [...prevState];
        })
    }
    const removeFromAllergyList = (allergyName) => {
        setAllergiesList((prevState) => {
            return prevState.filter((allergy) => {
                return allergy.name !== allergyName
            })
        })
    }


    useEffect(() => {
        const fetchAllergies = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/allergies`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
                console.log(responseData)
                setAllergiesList(responseData.allergiesList)
            } catch (err) { }

        };
        if (!!patientContext.patientId) {
            fetchAllergies();
        }
    }, []);
    console.log(allergiesList)
    return (
        <Container>
            <Card className={classes.allergiesCard}>
                <AllergiesLoaded allergiesList={allergiesList} removeFromAllergyList={removeFromAllergyList} addToAllergyList={addToAllergyList} />
            </Card>
        </Container>
    )
}

export default AllergiesInfo;