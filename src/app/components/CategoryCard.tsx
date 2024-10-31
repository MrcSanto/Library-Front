import {useState} from "react";
import {Card, Button, Modal} from 'react-bootstrap'
import {Categoria} from "@/app/types/types";

interface CategoriaCardProps {
    categoria: Categoria;
}

export const CategoriaCard: React.FC<CategoriaCardProps> = ({ categoria }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);

    const handleShowDetails = () => {
        setSelectedCategoria(categoria);
        setShowModal(true);
    };

    return (
        <>
            <Card style={{ marginBottom: "1rem" }}>
                <Card.Body>
                    <Card.Title>{categoria.nome}</Card.Title>
                    <Card.Text>
                        <strong>Descrição:</strong> {categoria.descricao}
                    </Card.Text>
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
                        {selectedCategoria ? selectedCategoria.nome : "Descrição da Categoria"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCategoria ? (
                        <>
                            <p><strong>Nome:</strong> {selectedCategoria.nome}</p>
                            <p><strong>Descrição:</strong> {selectedCategoria.descricao}</p>
                        </>
                    ) : (
                        <p>Carregando informações da categoria...</p>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};