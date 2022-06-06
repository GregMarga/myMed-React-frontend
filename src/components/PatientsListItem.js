import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteButton from './UI/DeleteButton'
import EditButton from './UI/EditButton';
import classes from './PatientsListItem.module.css'

const PatientsListItems = (props) => {
        function deleteHandler(){
                props.onDelete(props.id);
        }
        function editHandler(){
                props.onEdit(props.id);
        }
        return (


                <Row className={classes.myLinks} >

                        <Col className='text-center'><Link to={`/patients/${props.id}/basic`} style={{ textDecoration: 'none', color: 'black' }}><span>{props.sirname}</span></Link></Col>
                        <Col className='text-center'><Link to={`/patients/${props.id}/basic`} style={{ textDecoration: 'none', color: 'black' }}><span>{props.name}</span></Link></Col>
                        <Col className='text-center'><Link to={`/patients/${props.id}/basic`} style={{ textDecoration: 'none', color: 'black' }}><span>{props.fathersName}</span></Link></Col>
                        <Col className='text-center'><Link to={`/patients/${props.id}/basic`} style={{ textDecoration: 'none', color: 'black' }}><span>{props.age}</span></Link></Col>
                        <Col className='text-center'><Link to={`/patients/${props.id}/basic`} style={{ textDecoration: 'none', color: 'black' }}><span>{props.tel}</span></Link></Col>
                        <Col className='text-center'><Link to={`/patients/${props.id}/basic`} style={{ textDecoration: 'none', color: 'black' }}><span>{props.amka}</span></Link></Col>
                        <Col className='text-end' >
                                <EditButton onClick={editHandler}/>
                                <DeleteButton onClick={deleteHandler} />
                        </Col>

                </Row>


        );
}

export default PatientsListItems