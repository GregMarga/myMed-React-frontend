import { Row, Col } from "react-bootstrap";

const AllergiesHits = (props) => {
    return (
        <Row>
            <Col>
                {props.allergies.map((allergy) => {
                    return <option value={allergy.name} />
                })
                }
            </Col>
        </Row>
    )
}

export default AllergiesHits;