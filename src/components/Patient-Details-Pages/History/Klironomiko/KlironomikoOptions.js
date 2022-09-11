import { useCallback, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import classes from './Klironomiko.module.css';

const KlironomikoOptions = (props) => {
//     const addToList=useCallback(()=>{
//         if (!!props.defaultChecked){
//             props.addToCleronomicalList(props.label)
//             console.log('done')
//         }
//     })
//     useEffect(() => {
//         addToList()
// }, [addToList])



    return (
        <Row>
            <Col xs={2} md={1} className='text-end'><input type='checkbox' value={props.label} onChange={props.changeHandler} defaultChecked={props.defaultChecked}/></Col>
            <Col className='text-start'><label>{props.label}</label></Col>
        </Row>
    );
}
export default KlironomikoOptions;