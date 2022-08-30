import { Container, Row, Col } from 'react-bootstrap'
import Files from '../../../Patient-Details-Pages/NewFiles/Files'
import { useState, useEffect } from 'react';

const FilesInfo = (props) => {
    // const [farmakaList, setFarmakaList] = useState([]);
    return (
        <Container>
            <Files info/>
        </Container>
    );

}

export default FilesInfo;