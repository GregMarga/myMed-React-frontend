import { Container, Row, Col } from "react-bootstrap";
import SurgeriesListItem from './SurgeriesListItem';

const SurgeriesList = (props) => {
    console.log(props)
   
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
           
        </Container>
    );
}

export default SurgeriesList;

