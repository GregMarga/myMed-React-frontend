import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ConditionsFinder from "../ConditionsFinder";

const AllergiesLoaded = (props) => {
    const [addAllergy,setAddAllergy]=useState(false)
    return (
        props.allergiesList.map((allergy) => {
            return (
                <Row>
                    <Col>
                        <span>
                            {allergy }
                        </span>
                    </Col>
                </Row>
            )
        })
    );
    <button type='button' onClick={()=>{setAddAllergy(true)}}>Προσθήκη</button>
}

export default AllergiesLoaded;