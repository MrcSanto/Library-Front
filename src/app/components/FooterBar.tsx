import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import HealthStatus from "@/app/components/HealthStatus";

export default function FooterBar() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Nav>
                        <Navbar.Brand>
                            <HealthStatus></HealthStatus>
                        </Navbar.Brand>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}