import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import FarmakaListItem from "./FarmakaListItem";


const FarmakaList = (props) => {
    console.log('list:',props.farmakaList)

    return (
        <Fragment>
            {props.farmakaList.map(farmako => {
                return <FarmakaListItem
                    farmakoName={farmako.name}
                    farmakoType={farmako.ATC_name}
                    dateOfStart={farmako.dateOfStart}
                    dateOfEnd={farmako.dateOfEnd}
                    key={farmako.id}
                />
            })}
            {(props.farmakaList.length === 0) && (!props.addFarmako) && <Row>
                <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε μία φαρμακευτική αγωγή.</Col>
            </Row>}
        </Fragment>
    );
}

export default FarmakaList;