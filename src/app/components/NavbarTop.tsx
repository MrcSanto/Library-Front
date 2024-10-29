import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import {NavDropdown} from "react-bootstrap";

export default function NavbarTop() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
    };

    const handleRedirect = (type : string) => {
        router.push(`/admin#${type}`);
    };

    return (
        <Navbar bg="dark" expand="md" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Biblioteca
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} href="/categories" passHref>
                            Generos
                        </Nav.Link>
                        <Nav.Link as={Link} href="/books" passHref>
                            Nossos Livros
                        </Nav.Link>

                        {isLoggedIn && (
                            <>
                                <NavDropdown title="Admin" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => handleRedirect('livros')}>Livros</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleRedirect('clientes')}>Clientes</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleRedirect('emprestimos')}>Empréstimos</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}

                        {!isLoggedIn ? (
                            <Nav.Link as={Link} href="/login" passHref>
                                Login
                            </Nav.Link>
                        ) : (
                            <Nav.Link onClick={handleLogout}>
                                Logout
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
