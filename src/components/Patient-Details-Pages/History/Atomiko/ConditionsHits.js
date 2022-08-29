import { Fragment } from "react";


const ConditionsHits=(props)=>{
 
    return (
        <Fragment>
            {props.hit.map((hit)=>{
                return (<option value={hit.code+': '+hit.condition} key={hit.objectID}/>);
            })
            }
        </Fragment>
    );
}

export default ConditionsHits;