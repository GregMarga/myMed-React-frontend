import { Fragment } from "react";


const FarmakaHit=(props)=>{
 
    return (
        <Fragment>
            {props.hit.map((hit)=>{
                return (<option value={hit.name} key={hit.objectID}/>);
            })
            }
        </Fragment>
    );
}

export default FarmakaHit;