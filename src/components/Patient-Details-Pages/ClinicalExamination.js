
import { Container, Row, Col } from 'react-bootstrap';
import classes from './ClinicalExamination.module.css';

const ClinicalExamination = () => {
    return (
        <form className={classes.clinical}>
            <Container >
                <Row className='justify-content-center '>
                    <Col><div>ΑΝΤΙΚΕΙΜΕΝΙΚΗ ΕΞΕΤΑΣΗ</div></Col>
                </Row>
                    


            </Container>
        </form>
    );
}


export default ClinicalExamination;