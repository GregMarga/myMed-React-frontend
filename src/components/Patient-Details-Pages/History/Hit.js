import { Container, Row, Col } from "react-bootstrap";
import { Highlight, RefinementList, Configure, Pagination } from "react-instantsearch-dom";

{/* <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}></InstantSearch> */ }

const Hit = (props) => {
  return (
    <Container>
      <Row>
        <Col xs={1}>
          <span className="hitCheckbox">
            {/* <Highlight hit={props.hit}><input type='checkbox' /></Highlight> */}
            <input type='radio' name='condition' value={props.hit.code}/>
          </span>
        </Col>
        <Col className="text-start">

          <label>
            {/* <Highlight attribute="code" hit={props.hit} /> */}
            {props.hit.code}
            <span>&nbsp;:&nbsp;&nbsp;</span>
            {props.hit.condition}
            {/* <Highlight attribute="condition" hit={props.hit} /> */}

          </label>

        </Col>
      </Row>
    </Container>
  );
};

export default Hit;