// import classes from './VisitsListItems.module.css';
import { Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import EditButton from '../../UI/EditButton';
import DeleteButton from '../../UI/DeleteButton';
import moment from 'moment';

const VisitsListItems = (props) => {
    const location=useLocation();
    
   
    return (
       
           
                <Row className='myLabs' >

                    <Col className='text-sm-end'> <Link to={`${location.pathname}/${props.visitId}`} style={{ textDecoration: 'none', color: 'black'}}><span>{props.visitType} </span></Link></Col>
                    <Col className='text-sm-end'> <Link to={`${location.pathname}/${props.visitId}`} style={{ textDecoration: 'none', color: 'black'}}><span>{moment(props.date).format('MM/DD/YYYY')} </span></Link></Col>
                    <Col className='text-sm-end'> <Link to={`${location.pathname}/${props.visitId}`} style={{ textDecoration: 'none', color: 'black'}}><span>{props.diagnosis} </span></Link></Col>
                    <Col className='text-end' sm='2'><EditButton/><DeleteButton/></Col>                   

                </Row>
           
        
    );
}

export default VisitsListItems;