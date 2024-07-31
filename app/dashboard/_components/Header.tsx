"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {
    const path = usePathname();
    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Image src={'/logo.svg'} width={50} height={50} alt='logo' />
            <ul className='hidden md:flex gap-6'>
                <li className={`hover:text-primary font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
                <li className={`hover:text-primary font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
                <li className={`hover:text-primary font-bold transition-all cursor-pointer ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
                <li className={`hover:text-primary font-bold transition-all cursor-pointer ${path == '/dashboard/works' && 'text-primary font-bold'}`}>How it works?</li>
            </ul>
            <UserButton />
        </div>
    )
}

export default Header