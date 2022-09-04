import classes from './ConditionsInfo.module.css'
import { Row, Col } from 'react-bootstrap'
import ConditionsNavBar from './ConditionsNavBar';
import Card from '../../UI/Card';
import { Fragment, useState } from 'react';
import Atomiko from './Atomiko/Atomiko';
import Farmaka from './Farmaka/FarmakaInfo';
import SurgeriesInfo from './Surgeries/SurgeriesInfo';
import AllergiesInfo from './AllergiesInfo/AllergiesInfo';
import KlironomikoInfo from './KlironomikoInfo/KlironomikoInfo'
import FilesInfo from './Files/FilesInfo';
import GynaikologikoInfo from './GynaikologikoInfo/GynaikologikoInfo';



const ConditionsInfo = (props) => {
const [tabIsOpen,setTabIsOpen]=useState('atomiko')





    return (
        <Fragment>
            <ConditionsNavBar setTabIsOpen={setTabIsOpen} tabIsOpen={tabIsOpen}/>
        {/* <Card className={classes.conditionsInfoCard}> */}
            {tabIsOpen==='atomiko'&&<Atomiko/>}
            {tabIsOpen==='allergies'&&<AllergiesInfo/>}
            {tabIsOpen==='klironomiko'&&<KlironomikoInfo/>}
            {tabIsOpen==='surgeries'&&<SurgeriesInfo/>}
            {tabIsOpen==='farmaka'&&<Farmaka/>}
            {tabIsOpen==='files'&&<FilesInfo/>}
            {tabIsOpen==='gynaikologiko'&&<GynaikologikoInfo/>}
        {/* </Card> */}
        </Fragment>
    );
}

export default ConditionsInfo;