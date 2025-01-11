"use client"
import { cn, getInitials } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Session } from 'next-auth'

const Header = ({session} :{session : Session}) => {
    const pathname = usePathname();
  return (
   <header className='my-10 flex justify-between gap-5'>
    <Link href="/">
    <Image
    src="/icons/logo.svg"
    alt='logo'
    width={40}
    height={40}
    />
    </Link>
    <ul className='flex flex-row items-center gap-8'>
        <li>
            <Link href="/library" className={cn('text-base cursor-pointer capitalize' , pathname === '/library' ? 'text-light-200' :'text-light-100')}>Library</Link>
        </li>
        <li>
            <Link href="/my-profile">
            <Avatar>
                <AvatarFallback className='bg-amber-100'>{getInitials(session?.user?.name || 'IN')}</AvatarFallback>
            </Avatar>
            </Link>
        </li>
    </ul>
   </header>
  )
}

export default Header