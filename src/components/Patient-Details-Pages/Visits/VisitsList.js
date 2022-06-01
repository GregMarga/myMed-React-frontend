import classes from './VisitsList.module.css';
import { Container, Row, Col } from "react-bootstrap";
import VisitsListItems from './VisitsListItems';


const VisitsList = (props) => {
    const clickHandler=()=>{
        props.clickHandler();
    };

    return (
        <Container  fluid className={classes.visitsList}>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
          
            <Row >
                <Col className='text-sm-end'>
                    Προληπτική
                </Col>
                <Col className='text-sm-end'>
                    25/3/2019
                </Col>
                <Col className='text-sm-end'>
                    Υγιής
                </Col>
            </Row>
            <Row >
                <Col className='text-sm-end'>
                    Προληπτική
                </Col>
                <Col className='text-sm-end'>
                    25/3/2019
                </Col>
                <Col className='text-sm-end'>
                    Υγιής
                </Col>
            </Row>




        </Container>
    );
};

export default VisitsList;