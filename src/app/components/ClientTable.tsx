import React from 'react';
import { Table, Spinner, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Cliente } from "@/app/types/types";

interface ClientTableProps {
    loadingClients: boolean;
    clients: Cliente[];
    handleEdit: (clientId: number) => void;
    handleDelete: (clientId: number) => void;
    handleAdd: () => void;
}

const ClientTable: React.FC<ClientTableProps> = ({ loadingClients, clients, handleEdit, handleDelete, handleAdd }) => {
    return (
        <div className="container">
            <div className="text-center mb-3">
                <Button variant="primary" onClick={handleAdd}>
                    Adicionar Novo Cliente
                </Button>
            </div>
            {loadingClients ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Table striped bordered hover className="mt-3" style={{ maxWidth: "80%", margin: "0 auto" }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>CPF</th>
                        <th>Nome</th>
                        <th className="text-center">Editar</th>
                        <th className="text-center">Excluir</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map((client) => (
                        <tr key={client.clientId}>
                            <td>{client.clientId}</td>
                            <td>{client.clientCpf}</td>
                            <td>{client.clientNome}</td>
                            <td className="text-center">
                                <FaEdit style={{ cursor: "pointer", color: "blue" }} onClick={() => handleEdit(client.clientId)} />
                            </td>
                            <td className="text-center">
                                <FaTrash style={{ cursor: "pointer", color: "red" }} onClick={() => handleDelete(client.clientId)} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default ClientTable;
