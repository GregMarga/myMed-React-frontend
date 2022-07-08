import classes from './FileEdit.module.css';
import { Fragment } from "react";
import ImageUpload from "../../UI/ImageUpload";
import { useForm } from "../../../hooks/form-hook";
import { useHttpClient } from '../../../hooks/http-hook';
import { AuthContext } from '../../../context/auth-context'
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../../UI/Card";
import SaveButton from '../../UI/SaveButton';
import ErrorModal from "../../UI/ErrorModal";
import { useParams } from 'react-router-dom';


const FileEdit = (props) => {

    const auth = useContext(AuthContext);
    const params = useParams();
    const [loadedFile, setLoadedFile] = useState({ pathname: '' })
    const { error, clearError, sendRequest } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm(
        {
            image: {
                image: undefined
            }
        },
        true
    );
    // const fetchFile = async () => {
    //     try {
    //         const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/files/${params.fileId}`, 'GET', null, { Authorization: 'Bearer ' + auth.token });
    //         setLoadVisit({});
    //     } catch (err) { }

    // };
    // useEffect(()=>{
    //     if(params.fileId!=='new'){
    //         fetchFile()
    //     }

    // },[])


    async function submitHandler(event) {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', formState.inputs.image.value);
            const responseData = await sendRequest(`http://localhost:5000/patients/${props.patientId}/files`, 'POST',
                formData
            )
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Fragment>
            {!!error && <ErrorModal error={error} onClear={clearError} />}
            <Container fluid className={classes.fileEdit}>
                <Card className={classes.cardFiles}>
                    <form onSubmit={submitHandler}>
                        <Row>

                            <Col className='text-center'>
                                <label>Όνομα αρχείου</label>
                                <input type='text' />
                            </Col>
                            <Col className='text-center'>
                                <label>Ημερομηνία</label>
                                <input type='date' />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ImageUpload imageSource={`http://localhost:5000/uploads/images/${params.fileId}`} center id='image' onInput={inputHandler} />
                            </Col>
                        </Row>
                        <Row><Col><SaveButton /></Col></Row>
                    </form>
                </Card>
            </Container>
        </Fragment>

    );
}

export default FileEdit;