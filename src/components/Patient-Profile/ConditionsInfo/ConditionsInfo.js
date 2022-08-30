import classes from './ConditionsInfo.module.css'
import { Row, Col } from 'react-bootstrap'
import ConditionsNavBar from './ConditionsNavBar';
import Card from '../../UI/Card';
import { Fragment, useState } from 'react';
import Atomiko from './Atomiko/Atomiko';
import Farmaka from './Farmaka/FarmakaInfo';
import SurgeriesInfo from './Surgeries/SurgeriesInfo';
import FilesInfo from './Files/FilesInfo';



const ConditionsInfo = (props) => {
const [tabIsOpen,setTabIsOpen]=useState('atomiko')





    return (
        <Fragment>
            <ConditionsNavBar setTabIsOpen={setTabIsOpen}/>
        {/* <Card className={classes.conditionsInfoCard}> */}
            {tabIsOpen==='atomiko'&&<Atomiko/>}
            {tabIsOpen==='surgeries'&&<SurgeriesInfo/>}
            {tabIsOpen==='farmaka'&&<Farmaka/>}
            {tabIsOpen==='files'&&<FilesInfo/>}
        {/* </Card> */}
        </Fragment>
    );
}

export default ConditionsInfo;