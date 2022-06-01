import { Row, Col } from "react-bootstrap";
import './Button.css';
import addLogo from './add.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Button = (props) => {
    const location = useLocation()
    function addHandler() {
        props.addHandler();
        console.log('clicked');
    }
    return (

        <Row className='justify-content-md-end'>
            <Col xs lg='2'></Col>

            <Col md='auto'>
                <Link to={`${location.pathname}/new`} style={{ textDecoration: 'none', color: 'black', hover: 'white' }}>
                    <button className="addButton" onClick={addHandler}>

                        <img src={addLogo} alt='Add ' />
                    </button>
                </Link>
            </Col>


        </Row >

    );
}

export default Button;