// import classes from './Atomiko.module.css'
import { Container, Row, Col } from 'react-bootstrap'
import Surgeries from '../../../Patient-Details-Pages/History/Surgeries/Surgeries'
import { useState, useEffect } from 'react';

const SurgeriesInfo = (props) => {
    const [surgeriesList, setSurgeriesList] = useState([]);
    return (
        <Container>
            <Surgeries surgeriesList={surgeriesList} setSurgeriesList={setSurgeriesList} />
        </Container>
    );

}

export default SurgeriesInfo;