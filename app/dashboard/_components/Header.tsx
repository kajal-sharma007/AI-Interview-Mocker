"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function Header() {
    const path = usePathname();
    const router = useRouter();
    const dashboard = () => {
        router.push('/dashboard');
    }
    const questions = () => {
        router.push('/dashboard/questions');
    }
    const upgrade = () => {
        router.push('/dashboard/upgrade');
    }
    const howtowork = () => {
        router.push('/dashboard/howtowork');
    }
    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Image src={'/logo.svg'} width={50} height={50} alt='logo' />
            <ul className='hidden md:flex gap-6'>
                <li onClick={dashboard} className={`hover:text-primary font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
                <li onClick={questions} className={`hover:text-primary font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
                <li onClick={upgrade} className={`hover:text-primary font-bold transition-all cursor-pointer ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
                <li onClick={howtowork} className={`hover:text-primary font-bold transition-all cursor-pointer ${path == '/dashboard/works' && 'text-primary font-bold'}`}>How it works?</li>
            </ul>
            <UserButton />
        </div>
    )
}

export default Header