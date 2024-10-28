'use client'

import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const router = useRouter(); // Usando useRouter para navegação no Next.js
    //const [error, setError] = React.useState('');

    const handleLogin = async (e: React.FormEvent): Promise<void>=> {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/library/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        })

        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            localStorage.setItem('token', token);

            router.push('/admin')
        } else {
            alert('Login failed!');
        }
    }

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '24rem', borderTop: '4px solid #000000' }}>
                <Card.Body>
                    <h4 className="text-center mb-4">Login</h4>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu usuário..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            <i className="bi bi-box-arrow-in-right"></i> Entrar
                        </Button>
                        <Button variant="link" className="w-100 mt-3" onClick={handleBackToHome}>
                            Voltar para a Página Inicial
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
