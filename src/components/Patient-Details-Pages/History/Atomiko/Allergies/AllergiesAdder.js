import { Row, Col } from "react-bootstrap";
import AllergiesHits from "./AllergiesHits";


const AllergiesAdder = (props) => {
    return (
        <Row>
            <Col>
                <input list='allergies' name='allergy' />
                <datalist id='allergies'>
                    {}
                </datalist>
            </Col>
        </Row>
    )
}

export default AllergiesAdder;