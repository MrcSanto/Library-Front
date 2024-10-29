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
                    <Card className="narrow_card">
                        <Card.Title className="text-center">
                            {`${index + 1}º`}
                        </Card.Title>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>{book.nome}</Card.Title>
                            <Card.Text>
                                <strong>Autor:</strong> {book.autor} <br />
                                <strong>Páginas:</strong> {book.paginas} <br />
                                <strong>Categoria:</strong> {book.categoria.nome} <br />
                                <strong>Disponível desde:</strong> {book.dataAdd ? book.dataAdd.toString() : 'Data não disponível'} <br/>
                                <strong>Quantidade de empréstimos:</strong> {book.qtdEmprestimos}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};
