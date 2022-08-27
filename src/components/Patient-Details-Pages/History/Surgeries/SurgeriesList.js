import { Container, Row, Col } from "react-bootstrap";
import SurgeriesListItem from './SurgeriesListItem';

const SurgeriesList = (props) => {
   
    return (
        <Container>
            {props.surgeriesList.map(surgery => {
                return <SurgeriesListItem
                    title={surgery.name}
                    dateOfEntrance={surgery.dateOfEntrance}
                    dateOfExit={surgery.dateOfExit}
                    hospital={surgery.hospital}
                    key={surgery.id}
                />
            })}
            {(props.surgeriesList.length === 0) && (!props.addSurgery) && <Row>
                <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε ένα χειρουργείο.</Col>
            </Row>}
            {/* <Row>
                <Col className="text-center">Αμυγδαλές</Col>
                <Col className="text-center">Αφαίρεση</Col>
                <Col className="text-center">25/3/2019</Col>
                <Col className="text-center">27/4/2019</Col>
                <Col className="text-center">Π.Γ.Ν Ρίου</Col>
            </Row> */}
        </Container>
    );
}

export default SurgeriesList;

