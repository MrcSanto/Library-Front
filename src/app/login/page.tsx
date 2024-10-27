'use client'

import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

export default function Login() {
    return <>
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '24rem', borderTop: '4px solid    #000000' }}>
                <Card.Body>
                    <h4 className="text-center mb-4">Login</h4>
                    <Form>
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Usuário</Form.Label>
                            <Form.Control type="text" placeholder="Digite seu usuário..." />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Digite sua senha..." />
                        </Form.Group>

                        <div className="text-center mb-3">
                            <a href="mailto:marco.antonio@santolin.com.br">marco.antonio@santolin.com.br</a><br />
                            <a href="tel:+5554999407969">(54) 99940-7969</a>
                        </div>

                        <Button variant="primary" type="submit" className="w-100">
                            <i className="bi bi-box-arrow-in-right"></i> Entrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    </>
}
