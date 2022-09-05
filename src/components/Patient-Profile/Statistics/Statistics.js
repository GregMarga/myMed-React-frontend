import classes from './Statistics.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import Biometrics from './Biometrics';
import OzoiStats from './OzoiStats';
import Card from '../../UI/Card';
import { useState } from 'react';


const Statistics = () => {
    const [tab, setTab] = useState('biometrics')
    
    return (
        <Container fluid className={classes.statistics}>
            <Row className={classes.buttonRow}>
                <Col>
                    <button className={classes.statsButton} onClick={() => { setTab('biometrics') }} >Βιομετρικά</button>
                
                
                    <button className={classes.statsButton} onClick={() => { setTab('ozoi') }} >Όζοι</button>
                </Col>
            </Row>
            <Card className={classes.statsCard}>
                <Row>
                    <Col className='text-center'><h4>Στατιστικά</h4></Col>
                </Row>

                {(tab === 'biometrics') && <Biometrics  />}
                {(tab === 'ozoi') && <OzoiStats  />}
            </Card>
        </Container>
    );
};

export default Statistics;