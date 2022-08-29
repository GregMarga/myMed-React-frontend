import { Row, Col } from "react-bootstrap";
import classes from './PatientProfile.module.css';
import profile from './profile.webp';


const BasicInfo = (props) => {
    return (
        <Row>
            <Col md={2} className='text-center'>
                <div>
                    <label>Όνομα:</label>
                    <span></span>
                </div>
                <div>
                    <label>Τόπος Γέννησης:</label>
                    <span></span>
                </div>
                <div>
                    <label>Επάγγελμα:</label>
                    <span></span>
                </div>
                <div>
                    <label>Τ.Κ:</label>
                    <span></span>
                </div>
            </Col>
            <Col md={2} className='text-center'>
                <div>
                    <label>Πατρώνυμο:</label>
                    <span></span>
                </div>
                <div>
                    <label>Ημ/ Γεννήσης:</label>
                    <span></span>
                </div>
                <div>
                    <label>Οικογενειακή Κατάσταση:</label>
                    <span></span>
                </div>
                <div>
                    <label>E-mail:</label>
                    <span></span>
                </div>
            </Col>
            <Col md={2} className='text-center'>
                <div>
                    <label>Επώνυμο:</label>
                    <span></span>
                </div>
                <div>
                    <label>Φύλο:</label>
                    <span></span>
                </div>
                <div>
                    <label>Περιοχή:</label>
                    <span></span>
                </div>
                <div>
                    <label>Τηλέφωνο:</label>
                    <span></span>
                </div>
            </Col>
            <Col md={2} className='text-center'>
                <div>
                    <label>ΑΜΚΑ</label>
                    <span></span>
                </div>
                <div>
                    <label>Οικογενειακή Κατάσταση:</label>
                    <span></span>
                </div>
                <div>
                    <label>Διεύθυνση:</label>
                    <span></span>
                </div>
            </Col>


            <Col md={3} className='text-end' xs={{ order: 'first' }} sm={{ order: 'last' }}>
                <span className={classes.profileImage}>
                    <img src={profile} />
                </span>

            </Col>
        </Row >
    );
}

export default BasicInfo;