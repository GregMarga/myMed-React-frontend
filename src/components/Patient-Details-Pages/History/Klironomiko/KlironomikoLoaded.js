import { Fragment, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ConditionsFinder from "../Atomiko/ConditionsFinder";

import classes from './KlironomikoLoaded.module.css'

const KlirnomikoLoaded = (props) => {
    const [addAllergy, setAddAllergy] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState({ code: '', condition: '' });
    
    
    
    let removeHandler=(nameToDelete)=>{
        console.log('out')
    };
    useEffect(()=>{
        removeHandler=(nameToDelete)=>{
            props.removeFromCleronomicalList(nameToDelete)
            console.log('in')
        }
    
    },[props.cleronomicalList,props.removeFromCleronomicalList])
    useEffect(()=>{
        if (selectedCondition.code!==''){
            props.addToCleronomicalList(selectedCondition.code+': '+selectedCondition.condition)
            setAddAllergy(false)
        }
    },[selectedCondition])
     

    return (
        <Fragment>
            {props.cleronomicalList.map((allergy) => {
                return (
                    <Row className={classes.loadedAllergy} key={allergy._id}>
                        <Col>
                            <span>
                                {allergy.name}
                            </span>
                        </Col>
                        <Col sm={2}>
                            <button type='button' onClick={()=>{removeHandler(allergy._id)}}>Διαγραφή</button>
                        </Col>
                    </Row>
                )
            })}
             {addAllergy&&<Row className={classes.addAllergy}>
                <Col  >
                    <ConditionsFinder setSelectedCondition={setSelectedCondition} setAddAllergy={setAddAllergy}/>
                </Col>
                <Col xs={2}>
                    <button>Ακύρωση</button>
                </Col>
            </Row>}
            {!addAllergy&&<Row>
                <Col xs={2} className={classes.addButton} >
                    <button type='button' onClick={()=>{setAddAllergy(true)}}>Προσθήκη</button>
                </Col>
            </Row>}
        </Fragment>
    );
   
}

export default KlirnomikoLoaded;