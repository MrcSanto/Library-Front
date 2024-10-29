'use client'

import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import NavbarTop from "@/app/components/NavbarTop";
import { AdminCard } from "../components/AdminCard";
import {Book, Categoria, Cliente} from '@/app/types/types';
import {Button, Col, Container, Form, Row, Spinner, Modal} from "react-bootstrap";
import ClientTable from "@/app/components/ClientTable";

export default function AdminPage() {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [loadingBook, setLoadingBook] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage : number = 6;

    const [showModal, setShowModal] = useState(false);
    const [newBook, setNewBook] = useState<Book>({
        bookId: 0,
        nome: '',
        autor: '',
        isbn: 0,
        paginas: 0,
        restantes: 0,
        categoria: { categoriaId: 0, nome: '', descricao: '' }
    });

    const [categories, setCategories] = useState<Categoria[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);

    const [clients, setClients] = useState<Cliente[]>([]);
    const [loadingClients, setLoadingClients] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    const fetchCategories = () => {
        fetch('http://localhost:5000/library/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchBooks = () => {
        if (currentPage <= 0) return; //por protecao

        setLoadingBook(true);
        fetch(`http://localhost:5000/library/books/?skip=${currentPage}&take=${booksPerPage}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                setBooks(data.data);
                //console.log(`http://localhost:5000/library/books/?skip=${currentPage}&take=${booksPerPage}`);
            })
            .catch(err => console.log(err))
            .finally(() => setLoadingBook(false));
    }

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = () => {
        setLoadingClients(true);
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/library/clients', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setClients(data.data);
                //console.log(data.data);
            })
            .catch((error) => console.error('Erro ao buscar clientes:', error))
            .finally(() => setLoadingClients(false));
    };

    // handlers dos livros
    const handleUpdate = (updatedBook: Book) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) => (book.bookId === updatedBook.bookId ? updatedBook : book))
        );
        alert("Livro atualizado com sucesso")
    };

    const handleDeleteBook = (bookId: number) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.bookId !== bookId));
        fetchBooks();
        alert("Livro deletado com sucesso")
    };

    const handleAddBook = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/library/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newBook),
        })
            .then(response => response.json())
            .then(data => {
                setBooks(prevBooks => [...prevBooks, data]);
                setShowModal(false);
                alert("Livro adicionado com sucesso");
            })
            .catch(error => {
                console.error('Erro ao adicionar livro:', error);
            });
    };

    // handlers dos usuários
    const handleUpdateCliente = (clientId: number) => {
        console.log("Editar cliente:", clientId);
    };

    const handleDeleteCliente = (clientId: number) => {
        console.log("Excluir cliente:", clientId);
    };

    const handleAddCliente = () => {
        console.log("Adicionar novo cliente");
    };


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
            <div id="livros">
                <h1 className='text-center'>Livros</h1>
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
                        {loadingBook ? spinner :
                            filteredBooks.map((book: Book) => (
                                <Col key={book.bookId} md={4}>
                                    <AdminCard
                                        book={book}
                                        onUpdate={handleUpdate}
                                        onDelete={handleDeleteBook}
                                    />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
                <div className="d-flex justify-content-center mt-3">
                    <Button variant="primary" onClick={() => setShowModal(true)}>Adicionar Novo Livro</Button>
                </div>
                <br/>
                <br/>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Novo Livro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBookName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Digite o nome do livro"
                                          value={newBook.nome}
                                          onChange={(e) => setNewBook({ ...newBook, nome: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formBookAuthor">
                            <Form.Label>Autor</Form.Label>
                            <Form.Control type="text" placeholder="Digite o autor do livro"
                                          value={newBook.autor}
                                          onChange={(e) => setNewBook({ ...newBook, autor: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formBookISBN">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control type="text" placeholder="Digite o ISBN do livro"
                                          value={newBook.isbn}
                                          onChange={(e) => setNewBook({ ...newBook, isbn: Number(e.target.value) })} />
                        </Form.Group>
                        <Form.Group controlId="formBookPages">
                            <Form.Label>Páginas</Form.Label>
                            <Form.Control type="number" placeholder="Digite o número de páginas"
                                          value={newBook.paginas}
                                          onChange={(e) => setNewBook({ ...newBook, paginas: Number(e.target.value) })} />
                        </Form.Group>
                        <Form.Group controlId="formBookRestantes">
                            <Form.Label>Restantes</Form.Label>
                            <Form.Control type="number" placeholder="Digite a quantidade de livros restantes"
                                          value={newBook.restantes}
                                          onChange={(e) => setNewBook({ ...newBook, restantes: Number(e.target.value) })} />
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedCategoryId}
                                onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map((category) => (
                                    <option key={category.categoriaId} value={category.categoriaId}>
                                        {category.nome}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fechar
                    </Button>
                    <Button className='text-center' variant="primary" onClick={handleAddBook}>
                        Adicionar Livro
                    </Button>
                </Modal.Footer>
            </Modal>


            <div id="clientes" className="container">
                <h1 className='text-center'>Clientes</h1>
                <ClientTable
                    loadingClients={loadingClients}
                    clients={clients}
                    handleEdit={handleUpdateCliente}
                    handleDelete={handleDeleteCliente}
                    handleAdd={handleAddCliente}
                />
            </div>

            <h1 id="emprestimos" className='text-center'>Empréstimos</h1>
            <p>Conteúdo relacionado a empréstimos.</p>
        </>
    );
}
