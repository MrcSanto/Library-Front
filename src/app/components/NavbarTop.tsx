import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Link from "next/link";

export default function NavbarTop() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Nav>
                        <Nav.Link as={Link} href="/categories" passHref>
                            Generos
                        </Nav.Link>
                        <Nav.Link as={Link} href="/books" passHref>
                            Nossos Livros
                        </Nav.Link>
                    </Nav>
                    <Navbar.Brand>
                        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Biblioteca
                        </Link>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link as={Link} href="/login" passHref>
                            Login
                        </Nav.Link>
                        <Nav.Link disabled>
                            Sair
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}