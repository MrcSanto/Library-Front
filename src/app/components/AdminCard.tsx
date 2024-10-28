import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {Book} from "@/app/types/types"

const AdminCard = ({ book, onEdit }) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                <Card.Text>
                    <strong>ISBN:</strong> {book.isbn}<br />
                    <strong>Páginas:</strong> {book.paginas}<br />
                    <strong>Restantes:</strong> {book.restantes}<br />
                </Card.Text>
                <Button variant="warning" onClick={() => onEdit(book)}>Editar</Button>
            </Card.Body>
        </Card>
    );
};

export default AdminCard;
