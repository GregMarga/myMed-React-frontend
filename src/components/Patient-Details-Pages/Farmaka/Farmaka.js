import { Container, Row, Col } from 'react-bootstrap';
import Card from '../../UI/Card';
import FarmakaList from './FarmakaList';
import FarmakaForm from './FarmakaForm';
// import SmallSAveButton from '../../UI/SmallSaveButton'

import { useHttpClient } from '../../../hooks/http-hook';
import { useState, useRef, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/auth-context';
import FarmakaHeader from './FarmakaHeader';
import classes from './Farmaka.module.css';




const Farmaka = () => {
    const { sendRequest, isLoadding, error, clearError } = useHttpClient();

  
    const testInputRef = useRef();
    const auth = useContext(AuthContext)



    const [farmakaList, setFarmakaList] = useState([])
    const [addFarmako, setAddFarmako] = useState(false);

    const  addFarmakaHandler = (farmako) => {
        setFarmakaList((prevState) => {
            return [...prevState, farmako];
        })
        console.log(farmakaList)
    }

    
    const removeFarmakoHandler = (farmakoIdToDelete) => {
        setFarmakaList((prevState) => {
            return prevState.filter(farmako=>{
                return farmako.id!==farmakoIdToDelete
            })
        })
    }



    return (
        <Container>
            <Card className={classes.farmakaCard}>
                <FarmakaHeader />
                {addFarmako && <FarmakaForm addFarmakaHandler={addFarmakaHandler} setAddFarmako={setAddFarmako}/>}
                <FarmakaList addFarmako={addFarmako} farmakaList={farmakaList} removeFarmakoHandler={removeFarmakoHandler}/>

                <Row>
                    {!addFarmako && <Col><button className={classes.addFarmako} onClick={() => { setAddFarmako(true) }}>Προσθήκη Φαρμάκου</button></Col>}
                </Row>
            </Card>
           
        </Container>
    );
}

export default Farmaka;