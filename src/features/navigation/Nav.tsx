import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { AuthButtonClient } from '../auth/AuthButtonClient'
import { rubikFont } from '@/lib/fonts'

export const Nav = () => {
    return (
        <nav className='px-4 py-4 h-12 border-b flex items-center justify-between z-10'>
            <div>
                <Link href="/" className={cn(
                    'text-2xl font-bold',
                    rubikFont.className
                )}>
                    Luxury Cars
                </Link>
            </div>
            <div className='flex items-center gap-5'>
                <AuthButtonClient />
            </div>
        </nav>
    )
}
