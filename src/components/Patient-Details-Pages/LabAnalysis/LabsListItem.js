import { Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import EditButton from '../../UI/EditButton';
import DeleteButton from '../../UI/DeleteButton';


const LabsListItem=(props)=>{
    const location=useLocation();

    return (      
            
                <Row className='myLabs' >

                    <Col className='text-sm-end'><Link to={`${location.pathname}/${props.labTestId}`} style={{ textDecoration: 'none', color: 'black'}}><span>{props.labType}</span></Link></Col>
                    <Col className='text-sm-end'><Link to={`${location.pathname}/${props.labTestId}`} style={{ textDecoration: 'none', color: 'black'}}><span>{props.labDate}</span></Link></Col>
                    <Col className='text-sm-end'><Link to={`${location.pathname}/${props.labTestId}`} style={{ textDecoration: 'none', color: 'black'}}><span>{props.visitDate}</span></Link></Col>  
                    <Col className='text-end' sm='2'><EditButton/><DeleteButton/></Col>                 

                </Row>           

       
    );
};

export default LabsListItem;