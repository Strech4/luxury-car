import { getUser } from '@/lib/auth-session'
import { redirect } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { Header } from './_components/Header'

export const dynamic = "force-dynamic";

export default async function layout({ children }: { children: React.ReactNode }) {

    const user = await getUser()

    if (!user) {
        redirect('/auth/signin')
    }

    if (user.role !== "admin") {
        toast.error("Vous n'avez pas les droits pour accéder à cette page !")
        redirect('/auth/signin')
    }

    return (
        <div className='p-5'>
            <Header />
            {children}
        </div>
    )
}
