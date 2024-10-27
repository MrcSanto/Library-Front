// Page.tsx
'use client';

import { useState, useEffect } from "react";
import {Container, Spinner, Row, Col, Form, Button} from 'react-bootstrap';

import { BookCard, Book } from "@/app/components/BookCard";
import NavbarTop from "@/app/components/NavbarTop";
import FooterBar from "@/app/components/FooterBar";

export default function Page() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 9;

    const fetchBooks = () => {
        if (currentPage <= 0) return; //por protecao

        setLoading(true);
        fetch(`http://localhost:5000/library/books/?skip=${currentPage}&take=${booksPerPage}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBooks(data.data);
                console.log(`http://localhost:5000/library/books/?skip=${currentPage}&take=${booksPerPage}`);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchBooks();
    }, [currentPage]);

    const filteredBooks = books.filter(
        (book: Book) => book.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const hasPreviousPage = currentPage > 1;
    const hasNextPage = books.length === booksPerPage;

    const spinner = <Spinner animation="border">
        <span className="sr-only"></span>
    </Spinner>;

    return (
        <>
            <NavbarTop />
            <Container className="mt-3 mb-4">
                <Row>
                    <Col md={4}>
                        <Form.Control
                            type='text'
                            placeholder='Buscar livro'
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-75"
                        />
                    </Col>
                    <Col md={4}>
                        <Button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={!hasPreviousPage}
                        >
                            Voltar uma página
                        </Button>
                    </Col>
                    <Col md={4}>
                        <Button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={!hasNextPage}
                        >
                            Passar para a próxima página
                        </Button>
                    </Col>
                </Row>

            </Container>
            <Container>
                <Row>
                    {loading ? spinner :
                        filteredBooks.map((book: Book) => (
                            <Col key={book.bookId} md={4}>
                                <BookCard
                                    book={book}
                                />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
            <FooterBar />
        </>
    );
}
