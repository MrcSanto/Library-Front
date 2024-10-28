import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function NavbarTop() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter(); // Instância do router

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Nav>
                        <Navbar.Brand>
                            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Biblioteca
                            </Link>
                        </Navbar.Brand>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} href="/categories" passHref>
                            Generos
                        </Nav.Link>
                        <Nav.Link as={Link} href="/books" passHref>
                            Nossos Livros
                        </Nav.Link>
                        {isLoggedIn && (
                            <>
                                <Nav.Link as={Link} href="/clientes" passHref>
                                    Cliente
                                </Nav.Link>
                                <Nav.Link as={Link} href="/livros" passHref>
                                    Livro
                                </Nav.Link>
                            </>
                        )}
                        {!isLoggedIn ? (
                            <Nav.Link as={Link} href="/login" passHref>
                                Login
                            </Nav.Link>
                        ) : (
                            <Nav.Link
                                onClick={handleLogout}
                            >
                                Logout
                            </Nav.Link>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
