import { Fragment } from "react";


const FarmakaATC = (props) => {
   
    return (
        <Fragment>
            {props.hit.map((hit) => {
                return (<option value={hit.ATC_name} key={hit.objectID}/>);
            })
            }
        </Fragment>
    );
}

export default FarmakaATC;