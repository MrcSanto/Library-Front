'use client'

import {useEffect, useState} from "react";
import NavbarTop from "@/app/components/NavbarTop";
import FooterBar from "@/app/components/FooterBar";

export default function Health() {
    const URL = 'http://localhost:5000/library/healthcheck'
    const [status, setStatus] = useState("Desligado")

    const fetchStatusServer = () => {
        fetch(URL)
        .then(res => res.json())
            .then(
                function (response) {
                    if (response.status == 'Sucesso') {
                        setStatus("Ligado")
                    }
                }
            )
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchStatusServer();
    }, []);

    return (
        <>
            <NavbarTop></NavbarTop>
            <main>
                <h1>{status}</h1>
            </main>
            <FooterBar></FooterBar>
        </>
    )
}