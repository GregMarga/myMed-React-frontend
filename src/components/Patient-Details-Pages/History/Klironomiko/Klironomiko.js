import { Container, Row, Col } from "react-bootstrap";
import classes from './Klironomiko.module.css';
import KlironomikoOptions from "./KlironomikoOptions";
import Card from "../../../UI/Card";
import ConditionsFinder from "../Atomiko/ConditionsFinder";
import { useContext, useState } from "react";
import { v4 as uuid } from 'uuid';
import { AuthContext } from "../../../../context/auth-context";
import { useHttpClient } from "../../../../hooks/http-hook";


const Klironomiko = (props) => {
    const [selectedCondition, setSelectedCondition] = useState({ code: '', condition: '' })
    const auth=useContext(AuthContext)
    const {sendRequest}=useHttpClient()
    const [selectedConditionsList, setSelectedConditionsList] = useState([])
    const [addKlironomiko, setAddKlironomiko] = useState(false);

    const changeHandler =async (event) => {
        if (event.target.checked) {
            const responseData = await sendRequest(`http://localhost:5000/patients/630ce238394ce3043ab038c8/conditions/id`, 'GET', null, { Authorization: 'Bearer ' + auth.token });

            props.setCleronomicalList((prevState) => {
                return [...prevState, {name:event.target.value,id:responseData}]
            })
        }
        else if (!event.target.checked) {
            props.setCleronomicalList((prevState) => {
                return prevState.filter((allergy) => {
                    return allergy.name !== event.target.value
                })
            })
        }

    }



    return (
        <Container className={classes.klironomiko}>
            <Card className={classes.klironomikoCard}>
                <KlironomikoOptions label='Z83.3: Οικογενειακό ιστορικό σακχαρώδους διαβήτη' changeHandler={changeHandler} />
                <KlironomikoOptions label='Z83.4: Οικογενειακό ιστορικό άλλων ενδοκρινικών, διατροφικών και μεταβολικών νοσημάτων' changeHandler={changeHandler} />
                <KlironomikoOptions label='E78.0 Αμιγής υπερχοληστερολαιμία' changeHandler={changeHandler} />
                <KlironomikoOptions label='Z81.1: Οικογενειακό ιστορικό κατάχρησης οινοπνεύματος' changeHandler={changeHandler} />
                <KlironomikoOptions label='Z81.2: Οικογενειακό ιστορικό κατάχρησης καπνού' changeHandler={changeHandler} />
                {selectedConditionsList.map((condition) => {
                    return (
                        <KlironomikoOptions label={`${condition.code}: ${condition.condition}`} changeHandler={changeHandler} key={uuid()} />

                    );
                })}
                <Row>
                    <Col>
                        {addKlironomiko && <ConditionsFinder add setSelectedCondition={setSelectedCondition} setSelectedConditionsList={setSelectedConditionsList} setAddAllergy={setAddKlironomiko} />}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {!addKlironomiko && <button className={classes.addCondition} onClick={() => { setAddKlironomiko(true) }}>Προσθήκη Πάθησης</button>}
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}
export default Klironomiko;