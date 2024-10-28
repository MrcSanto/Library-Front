'use client'
import NavbarTop from "@/app/components/NavbarTop";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Clientes(){
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return <>
        <NavbarTop></NavbarTop>
    </>
}