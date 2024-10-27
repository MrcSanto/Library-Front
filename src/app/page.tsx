'use client';

import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarTop from "@/app/components/NavbarTop";
import { Container, Spinner } from "react-bootstrap";
import FooterBar from "@/app/components/FooterBar";
import { useEffect, useState } from "react";
import { CardGrid } from "@/app/components/GridBookCard";
import {Book} from "@/app/types/types";

export default function Home() {
    const [popularBooks, setPopularBooks] = useState<Book[]>([]);
    const [recentBooks, setRecentBooks] = useState<Book[]>([]);
    const [loadingPopular, setLoadingPopular] = useState(true);
    const [loadingRecent, setLoadingRecent] = useState(false);

    const fetchPopularBooks = () => {
        setLoadingPopular(true);
        fetch('http://localhost:5000/library/books/most-popular')
            .then(res => res.json())
            .then(data => {
                setPopularBooks(data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoadingPopular(false));
    };

    const fetchRecentBooks = () => {
        setLoadingRecent(true);
        fetch('http://localhost:5000/library/books/most-recent')
            .then(res => res.json())
            .then(data => {
                setRecentBooks(data);
                console.log(data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoadingRecent(false))
    }

    useEffect(() => {
        fetchPopularBooks();
        fetchRecentBooks();
    }, []);

    return (
        <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
            <NavbarTop />
            <main>
                <Container>
                    <h1 className="mt-4 text-center">Livros Populares </h1><br/>
                    {loadingPopular ? (
                        <Spinner animation="border"/>
                    ) : (
                        <CardGrid books={popularBooks}/>
                    )}
                    <br />
                </Container>
                <Container>
                    <h1 className="mt-4 text-center">Livros Adicionados Recentemente</h1> <br/>
                    {loadingRecent ? (
                        <Spinner animation="border"/>
                    ) : (
                        <CardGrid books={recentBooks}/>
                    )}
                    <br />
                </Container>
            </main>
            <FooterBar />
        </div>
    );
}
