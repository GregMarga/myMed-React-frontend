import { useState, useEffect, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Card from "../components/UI/Card"
import Notifications, { notify } from 'react-notify-toast';
import { useHttpClient } from "../hooks/http-hook";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth-context";


const EmailConfirmation = () => {
    const [confirming, setConfirming] = useState(true);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId=useParams().userId;
    console.log(userId)

    const auth = useContext(AuthContext);

    useEffect(() => {
        const completeSignup = async () => {
            const responseData = await sendRequest(`http://localhost:5000/users/${userId}/login`, 'GET', null, { 'Content-Type': 'application/json' })
            console.log(responseData);
            auth.login(responseData.userId, responseData.token);
        }
        completeSignup();
    }, [])



    return (
        <Container>
            <Notifications />
            <Card>
                <Row>
                    <Col className="text-center"> Το e-mail επιβεβαιώθηκε επιτυχώς</Col>
                </Row>
            </Card>
        </Container>
    );
}

export default EmailConfirmation;