import { Fragment, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ConditionsFinder from "../ConditionsFinder";
import classes from './AllergiesLoaded.module.css'

const AllergiesLoaded = (props) => {
    const [addAllergy, setAddAllergy] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState({ code: '', condition: '' });

    console.log(props.allergiesList)

    let removeHandler = (nameToDelete) => {
        console.log('out')
    };
    useEffect(() => {
        removeHandler = (nameToDelete) => {
            props.removeFromAllergyList(nameToDelete)
            console.log('in')
        }

    }, [props.allergiesList, props.removeFromAllergyList])
    useEffect(() => {
        if (selectedCondition.code !== '') {
            props.addToAllergyList(selectedCondition.code + ': ' + selectedCondition.condition)
            setAddAllergy(false)
        }
    }, [selectedCondition])


    return (
        <Fragment>
            {props.allergiesList.map((allergy) => {
                return (
                    <Row className={classes.loadedAllergy} key={allergy._id}>
                        <Col sm={12} md={10}>
                            <span>
                                {allergy.name}
                            </span>
                        </Col>
                        <Col sm={2} className='text-start'>
                            <button type='button' onClick={() => { removeHandler(allergy._id) }}>Διαγραφή</button>
                        </Col>
                    </Row>
                )
            })}
            {addAllergy && <Row className={classes.addAllergy}>
                <Col  sm={12} md={10}>
                    <ConditionsFinder setSelectedCondition={setSelectedCondition} setAddAllergy={setAddAllergy} />
                </Col>
                <Col xs={2}>
                    <button type='button' onClick={() => { setAddAllergy(false) }}>Ακύρωση</button>
                </Col>
            </Row>}
            {!addAllergy && <Row>
                <Col xs={2} className={classes.addButton} >
                    <button type='button' onClick={() => { setAddAllergy(true) }}>Προσθήκη</button>
                </Col>
            </Row>}
        </Fragment>
    );

}

export default AllergiesLoaded;