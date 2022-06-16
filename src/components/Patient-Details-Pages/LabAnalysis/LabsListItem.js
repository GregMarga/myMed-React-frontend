import { Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import DeleteButton from '../../UI/DeleteButton';


const LabsListItem=(props)=>{
    const location=useLocation();

    function deleteHandler() {
        props.onDelete(props.labTestId,props.labType);
    }

    return (      
            
                <Row className='myLabs' >

                    <Col className='text-sm-end'><Link to={`${location.pathname}/${props.labType}/${props.labTestId}`} style={{ textDecoration: 'none', color: 'black'}}><span>{props.labType}</span></Link></Col>
                    <Col className='text-sm-end'><Link to={`${location.pathname}/${props.labType}/${props.labTestId}`} style={{ textDecoration: 'none', color: 'black'}}><span>{moment(props.labDate).format('MM/DD/YYYY')}</span></Link></Col>
                    <Col className='text-sm-end'><Link to={`${location.pathname}/${props.labType}/${props.labTestId}`} style={{ textDecoration: 'none', color: 'black'}}><span>{moment(props.visitDate).format('MM/DD/YYYY')}</span></Link></Col>  
                    <Col className='text-end' sm='2'><DeleteButton onClick={deleteHandler}/></Col>                 

                </Row>           

       
    );
};

export default LabsListItem;