import { Container, Row, Col } from "react-bootstrap";
import PregnacyListItem from "./PregnacyListItem";

const PregnaciesList = (props) => {
   
    return (
        <Container>
            {props.pregnacyList.map(pregnacy => {
                return <PregnacyListItem
                    date={pregnacy.date_of_birth}
                    gennisi={pregnacy.gennisi}
                    babyWeight={pregnacy.baby_weight}
                    comments={pregnacy.comments}
                    key={pregnacy._id}
                    id={pregnacy._id}
                    removePregnacyHandler={props.removePregnacyHandler}
                />
            })}
            {(props.pregnacyList.length === 0) &&(!props.addPregnacy) && <Row>
                <Col className='text-center'>Η λίστα είναι άδεια.</Col>
            </Row>}
           
        </Container>
    );
}

export default PregnaciesList;

