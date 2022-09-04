import classes from './VisitsList.module.css'
import { Row, Col, Container } from 'react-bootstrap'
import Card from '../../UI/Card';
import VisitsListHeader from './VisitsListHeader';
import VisitsListItem from './VisitsListItem';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/auth-context';
import { useHttpClient } from '../../../hooks/http-hook';
import moment from 'moment';
import { PatientContext } from '../../../context/patient-context';


const VisitsList = (props) => {
    const [visitList, setVisitList] = useState([])
    const auth = useContext(AuthContext);
    const patientContext = useContext(PatientContext)
    const { error, isLoading, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchVisits = async () => {
            const responseData = await sendRequest(`http://localhost:5000/patients/${patientContext.patientId}/visits`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
            setVisitList(responseData.visitList)
        }
        if (!!patientContext.patientId) {
            fetchVisits();
        }
    }, [sendRequest,patientContext.patientId])




    return (
        <Container>
            <Card className={classes.visitsListCard}>
                <VisitsListHeader />
                {visitList.map(visit => {
                    return <VisitsListItem
                        visitDate={moment(visit.date).format('DD-MM-YYYY')}
                        geniki_eikona={visit.geniki_eikona}
                        aitia_proseleusis={visit.aitia_proseleusis}
                        key={visit._id}
                        id={visit._id}
                    />
                })}
                {(visitList.length === 0) &&
                    <Row>
                        <Col className='text-center'>
                            Η λίστα των επισκέψεων είναι άδεια.
                        </Col>
                    </Row>
                }
            </Card>
            <Row>
                <Col className='text-end'>
                    <Link to={`/patients/${patientContext.patientId}/visits/new`} style={{ textDecoration: 'none', color: 'black' }}> <button className={classes.visitButton}>Δημιουργία Επίσκεψης</button></Link>
                </Col>
            </Row>
        </Container>
    );
}

export default VisitsList;