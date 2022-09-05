import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import OzoiListItem from "./OzoiListItem";


const OzoiList = (props) => {
    console.log(props.ozosList)

    return (
        <Fragment>
            {props.ozosList.map(ozos => {
                return <OzoiListItem
                    name={ozos.name}
                    identifier={ozos.identifier}
                    length={ozos.length}
                    height={ozos.height}
                    depth={ozos.depth}
                    dateOfFinding={ozos.dateOfFinding}
                    key={ozos._id}
                    id={ozos._id}
                    removeOzosHandler={props.removeOzosHandler}
                    editOzosHanlder={props.editOzosHanlder}
                    ozosList={props.ozosList}
                />
            })}
            {(props.ozosList.length === 0) && (!props.addOzos) && <Row>
                <Col className='text-center'>Η λίστα είναι άδεια,προσθέστε έναν όζο.</Col>
            </Row>}
        </Fragment>
    );
}

export default OzoiList;