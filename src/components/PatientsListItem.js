import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteButton from './UI/DeleteButton'
import classes from './PatientsListItem.module.css'

const PatientsListItems = (props) => {
        function deleteHandler(){
                props.onDelete({id:props.id,amka:props.amka});
        }
       
        return (


                <Row className={classes.myLinks} >

                        <Col className='text-center'><Link to={`/patients/${props.id}/profile`} style={{ textDecoration: 'none', color: 'black' }}><span>{props.sirname}</span></Link></Col>
                        <Col className='text-center'><Link to={`/patients/${props.id}/profile`} style={{ textDecoration: 'none', color: 'black' }}><span>{props.name}</span></Link></Col>
                        <Col className='text-center'><Link to={`/patients/${props.id}/profile`} style={{ textDecoration: 'none', color: 'black' }}><span>{props.fathersName}</span></Link></Col>
                        <Col className='text-center'><Link to={`/patients/${props.id}/profile`} style={{ textDecoration: 'none', color: 'black' }}><span>{props.age}</span></Link></Col>
                        <Col className='text-center'><Link to={`/patients/${props.id}/profile`} style={{ textDecoration: 'none', color: 'black' }}><span>{props.tel}</span></Link></Col>
                        <Col className='text-center'><Link to={`/patients/${props.id}/profile`} style={{ textDecoration: 'none', color: 'black' }}><span>{props.amka}</span></Link></Col>
                        <Col className='text-center' sm={2}>
                                
                                <DeleteButton onClick={deleteHandler} />
                        </Col>

                </Row>


        );
}

export default PatientsListItems