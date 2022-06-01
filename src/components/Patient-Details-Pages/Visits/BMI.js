import { Fragment } from "react";


const BMI=(props)=>{
    function calcBMI(weight,height){
        let wght=Number(weight);
        let hght=Number(height);
        let bmi=wght/(hght*hght);
        return bmi.toFixed(2);
    }
    const bmi=calcBMI(props.weight,props.height)
    console.log(props.weight,props.height)
    return (
        <Fragment>
            <label >ΒΜΙ</label> <input placeholder={bmi} readOnly/>
        </Fragment>
    );
};

export default BMI;