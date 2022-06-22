import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DeleteButton from '../../UI/DeleteButton';
import moment from 'moment';

const FilesListItem = (props) => {
    const name=props.fileName.split('\\')[2];
    const extension=name.split('.')[1]
    console.log(name)
    

    const location = useLocation();
    function deleteHandler(){};

    return (
        <Row>
            <Col className='text-sm-end' xs='5'> <Link to={`${location.pathname}/${name}`} style={{ textDecoration: 'none', color: 'black' }}><span>{name} </span></Link></Col>
            <Col className='text-sm-end'> <Link to={`${location.pathname}/${name}`} style={{ textDecoration: 'none', color: 'black' }}><span>{moment(props.date).format('DD/MM/YYYY')} </span></Link></Col>
            <Col className='text-sm-end'> <Link to={`${location.pathname}/${name}`} style={{ textDecoration: 'none', color: 'black' }}><span>{extension} </span></Link></Col>
            <Col className='text-end' sm='2'><DeleteButton onClick={deleteHandler} /></Col>
        </Row>
    );
}

export default FilesListItem;