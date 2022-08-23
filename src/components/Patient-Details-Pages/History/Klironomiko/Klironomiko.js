import { Container, Row, Col } from "react-bootstrap";
import classes from './Klironomiko.module.css';
import KlironomikoOptions from "./KlironomikoOptions";
import Card from "../../../UI/Card";

const Klironomiko = () => {
    return (
        <Container className={classes.klironomiko}>
            <Card className={classes.klironomikoCard}>
                <KlironomikoOptions label='Z83.3: Οικογενειακό ιστορικό σακχαρώδους διαβήτη' />
                <KlironomikoOptions label='Z83.4: Οικογενειακό ιστορικό άλλων ενδοκρινικών, διατροφικών και μεταβολικών νοσημάτων' />
                <KlironomikoOptions label='E78.0 Αμιγής υπερχοληστερολαιμία' />
                <KlironomikoOptions label='Z81.1: Οικογενειακό ιστορικό κατάχρησης οινοπνεύματος' />
                <KlironomikoOptions label='Z81.2: Οικογενειακό ιστορικό κατάχρησης καπνού' />
            </Card>
        </Container>
    );
}
export default Klironomiko;