import { Row, Card, Col } from 'react-bootstrap';
import {Book} from "@/app/types/types"

interface BookCardProps {
    books: Book[];
}

export const CardGrid: React.FC<BookCardProps> = ({ books }) => {
    return (
        <Row xs={1} md={2} className="g-4">
            {books.map((book, index) => (
                <Col key={book.bookId}>
                    <Card
                        className="narrow_card"
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                        <Card.Header className="text-center">
                            {`${index + 1}º Lugar`}
                        </Card.Header>
                        <Card.Img
                            src={book.imagem}
                            alt={`Capa do livro ${book.nome}`}
                            style={{ width: '150px', height: '200px', objectFit: 'cover' }}
                        />
                        <Card.Body>
                            <Card.Title className='text-center'>{book.nome}</Card.Title>
                            <Card.Body>
                                <strong>Autor:</strong> {book.autor} <br />
                                <strong>Páginas:</strong> {book.paginas} <br />
                                <strong>Categoria:</strong> {book.categoria.nome} <br />
                                <strong>Disponível desde:</strong> {book.dataAdd ? book.dataAdd.toString() : 'Data não disponível'} <br/>
                                <strong>Quantidade de empréstimos:</strong> {book.qtdEmprestimos}
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};
