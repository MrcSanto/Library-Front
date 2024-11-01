import { Card, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Book } from "@/app/types/types";
import {useRouter} from "next/navigation";

interface BookCardProps {
    book: Book;
    onUpdate: (updatedBook: Book) => void;
    onDelete: (bookId: number) => void;
}

export const AdminCard: React.FC<BookCardProps> = ({ book, onUpdate, onDelete }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedBook, setEditedBook] = useState<Book>(book);
    const router = useRouter();

    const handleEdit = () => {
        setEditedBook(book);
        setShowEditModal(true);
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:5000/library/books/${book.bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                nome : editedBook.nome,
                autor : editedBook.autor,
                isbn : editedBook.isbn,
                paginas: editedBook.paginas,
                restantes: editedBook.restantes,
                qtdEmprestimos: editedBook.qtdEmprestimos,
                imagem: editedBook.imagem
            }),
        });

        if (response.status === 401) {//significa que provavelmente o token expirou ou está inválido
            alert('Sessão expirada!')
            localStorage.removeItem('token');
            router.push('/login');
            return;
        }

        const updatedBook = await response.json();
        onUpdate(updatedBook);
        setShowEditModal(false);
    };

    const handleExcluirLivro = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/library/books/${book.bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 401) { //significa que provavelmente o token expirou ou está inválido
            alert('Sessão expirada!')
            localStorage.removeItem('token');
            router.push('/login');
            return;
        }

        onDelete(book.bookId);
        setShowEditModal(false);
    };

    const defaultImage = '/download.svg'
    
    return (
        <>
            <Card style={{ marginBottom: "1rem" }}>
                <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card.Title className='text-center'>{book.nome}</Card.Title>
                    <Card.Img
                        src={book.imagem || defaultImage}
                        alt={`Capa do livro ${book.nome}`}
                        style={{ width: '150px', height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Text>
                        <strong>Autor:</strong> {book.autor} <br />
                        <strong>Páginas:</strong> {book.paginas} <br />
                    </Card.Text>
                    <Button onClick={handleEdit}>Editar</Button>
                </Card.Body>
            </Card>

            <Modal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                dialogClassName="modal-dark1"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Livro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBookName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedBook.nome}
                                onChange={(e) => setEditedBook({ ...editedBook, nome: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBookAuthor">
                            <Form.Label>Autor</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedBook.autor}
                                onChange={(e) => setEditedBook({ ...editedBook, autor: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBookPages">
                            <Form.Label>Páginas</Form.Label>
                            <Form.Control
                                type="number"
                                value={editedBook.paginas}
                                onChange={(e) => setEditedBook({ ...editedBook, paginas: Number(e.target.value) })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBookRestantes">
                            <Form.Label>Restantes</Form.Label>
                            <Form.Control
                                type="number"
                                value={editedBook.restantes}
                                onChange={(e) => setEditedBook({ ...editedBook, restantes: Number(e.target.value) })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBookQuantidadeEmprestimos">
                            <Form.Label>Quantidade de Empréstimos</Form.Label>
                            <Form.Control
                                type="number"
                                value={editedBook.qtdEmprestimos}
                                onChange={(e) => setEditedBook({ ...editedBook, qtdEmprestimos: Number(e.target.value) })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBookImage">
                            <Form.Label>URL da Imagem</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Insira a URL da imagem da capa"
                                value={editedBook.imagem || ''}
                                onChange={(e) => setEditedBook({ ...editedBook, imagem: e.target.value })}
                            />
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleExcluirLivro}>
                        Excluir Livro
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Salvar
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
};
