import { Card, Modal } from "react-bootstrap";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import {Book} from "@/app/types/types"

interface BookCardProps {
    book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const handleShowDetails = () => {
        setSelectedBook(book);
        setShowModal(true);
    };

    return <>
        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: "1rem" }}>
            <Card.Body>
                <Card.Title className='text-center'>{book.nome}</Card.Title>
                <Card.Img
                    src={book.imagem}
                    alt={`Capa do livro ${book.nome}`}
                    style={{ width: '150px', height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className='text-center'>
                    <strong>Autor:</strong> {book.autor} <br/>
                    <strong>Páginas:</strong> {book.paginas} <br/>
                    <strong>Categoria:</strong> {book.categoria.nome} <br/>
                </Card.Body>
                <div className="d-flex justify-content-center">
                    <Button onClick={handleShowDetails}>Saiba mais</Button>
                </div>
            </Card.Body>
        </Card>

        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            dialogClassName="modal-dark1"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {selectedBook ? selectedBook.nome : "Descrição do Livro"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedBook ? (
                    <>
                        <p><strong>Categoria:</strong> {selectedBook.categoria.nome}</p>
                        <p><strong>Descrição Categoria:</strong> {selectedBook.categoria.descricao}</p>
                        <p><strong>Autor:</strong> {selectedBook.autor}</p>
                        <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
                        <p><strong>Restantes:</strong> {selectedBook.restantes}</p>
                    </>
                ) : (
                    <p>Carregando informações do livro...</p>
                )}
            </Modal.Body>
        </Modal>
    </>
};
