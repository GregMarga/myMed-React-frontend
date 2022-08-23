import { Link } from 'react-router-dom'
import { notify } from 'react-notify-toast'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap';
// import Spinner from './Spinner'

const Confirm = () => {
    const [confirming, setConfirming] = useState(true);
    return(
        <div className='confirm'>
            {confirming?<Spinner/>:<Link to='/'>

                </Link>}
        </div>
    );
}

export default Confirm;

