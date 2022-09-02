import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import FarmakaListItem from "./FarmakaListItem";
import moment from "moment";

const FarmakaList = (props) => {

    return (
        <Fragment>
            {props.farmakaList.map(farmako => {
                return <FarmakaListItem
                    farmakoName={farmako.name}
                    farmakoType={farmako.ATC_name}
                    dateOfStart={(!!farmako.dateOfStart)?moment(farmako.dateOfStart).format('DD-MM-YYYY'):''}
                    dateOfEnd={(!!farmako.dateOfEnd)?moment(farmako.dateOfEnd).format('DD-MM-YYYY'):''}
                    key={farmako.id}
                    id={farmako._id}
                    removeFarmakoHandler={props.removeFarmakoHandler}
                />
            })}
            {(props.farmakaList.length === 0) && (!props.addFarmako) && <Row>
                <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε μία φαρμακευτική αγωγή.</Col>
            </Row>}
        </Fragment>
    );
}

export default FarmakaList;