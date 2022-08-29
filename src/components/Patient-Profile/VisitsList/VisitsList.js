import classes from './VisitsList.module.css'
import { Row, Col } from 'react-bootstrap'
import Card from '../../UI/Card';

const VisitsList = (props) => {
    return (
        <Card className={classes.visitsListCard}>
            <Row>

                <Col className='text-center'>Visits List</Col>
            </Row>
        </Card>
    );
}

export default VisitsList;