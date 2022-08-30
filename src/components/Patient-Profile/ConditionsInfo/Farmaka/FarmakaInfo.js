// import classes from './Atomiko.module.css'
import { Container, Row, Col } from 'react-bootstrap'
import Farmaka from '../../../Patient-Details-Pages/Farmaka/Farmaka'
import { useState, useEffect } from 'react';

const FarmakaInfo = (props) => {
    // const [farmakaList, setFarmakaList] = useState([]);
    return (
        <Container>
            <Farmaka  info/>
        </Container>
    );

}

export default FarmakaInfo;