'use client';

import { useState, useEffect } from "react";
import { Container, Spinner, Row, Col} from 'react-bootstrap';
import { Categoria } from "@/app/types/types";
import NavbarTop from "@/app/components/NavbarTop";
import FooterBar from "@/app/components/FooterBar";
import { CategoriaCard } from "@/app/components/CategoryCard";

export default function Categories() {
    const [categories, setCategories] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = () => {
        setLoading(true);
        fetch('http://localhost:5000/library/categories')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCategories(data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const spinner = <Spinner animation="border" />;

    return (
        <>
            <NavbarTop /><br/>
            <h1 className='text-center'>Contamos com diversos gêneros literários</h1><br/>
            <Container className="mt-3 mb-4">
                <Row>
                    {loading ? (
                        <div className="text-center">{spinner}</div>
                    ) : (
                        categories.map((categoria) => (
                            <Col key={categoria.categoriaId} sm={12} md={6} lg={4}>
                                <CategoriaCard categoria={categoria} />
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
            <FooterBar />
        </>
    );
}
