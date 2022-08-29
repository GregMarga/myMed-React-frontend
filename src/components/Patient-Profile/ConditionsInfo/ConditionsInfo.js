import classes from './ConditionsInfo.module.css'
import { Row, Col } from 'react-bootstrap'
import ConditionsNavBar from './ConditionsNavBar';
import Card from '../../UI/Card';
import { Fragment, useState } from 'react';

const ConditionsInfo = (props) => {
    const tabs = ['Ατομικό', 'Κληρονομικό', 'Χειρουργεία', 'Γυναικολογικό'];





    return (
        <Fragment>
            <ConditionsNavBar/>
        <Card className={classes.conditionsInfoCard}>
            <Row>

                <Col className='text-center'>more info</Col>
               
            </Row>
        </Card>
        </Fragment>
    );
}

export default ConditionsInfo;