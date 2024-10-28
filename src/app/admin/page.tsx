'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarTop from "@/app/components/NavbarTop";

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return (
        <>
            <NavbarTop></NavbarTop>
        </>
    );
}
