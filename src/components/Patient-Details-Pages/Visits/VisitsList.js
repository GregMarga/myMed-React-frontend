import classes from './VisitsList.module.css';
import { Container, Row, Col } from "react-bootstrap";
import VisitsListItems from './VisitsListItems';


const VisitsList = (props) => {
    const clickHandler = () => {
        props.clickHandler();
    };

    return (
        <Container fluid className={classes.visitsList}>

            {props.visits.map((visit) => {
                // console.log(visit.diagnosis)
                return <VisitsListItems
                    key={visit._id}
                    visitId={visit._id}
                    visitType='Προληπτική'
                    date={visit.date}
                    diagnosis={visit.diagnosis}
                    clickHandler={clickHandler}
                />
            })}
            {(props.visits.length === 0) && <Row>
                <Col className='text-center'>List is empty,add a visit.</Col>
            </Row>}
            {/* {(props.visits.length>0)&&<VisitsListItems visitId='v1'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>} */}
            {/* <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/>
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
            <VisitsListItems visitId='v2'visitType='Προληπτική' date='25/3/2019' diagnosis='Υγιής' clickHandler={clickHandler}/> */}


        </Container>
    );
};

export default VisitsList;