import Gynaikologiko from '../../../Patient-Details-Pages/History/Gynaikologiko/Gynaikologiko'
import Card from '../../../UI/Card';
import classes from './Gynaikologiko.module.css'

const GynaikologikoInfo = (props) => {


    return (
        <Card className={classes.gynaikologikoInfo}>
            <Gynaikologiko />
        </Card>
    )
}

export default GynaikologikoInfo;