"use client"

import React from 'react'
import { SignInButton } from './SignInButton'
import { useSession } from '@/lib/auth-client'
import { getUser } from '@/lib/auth-session'
import Link from 'next/link'
import { LoggedInButton } from './LoggedInButton'

export const AuthButtonClient = () => {

    const { data: session, } = useSession()

    if (session?.user) {
        return <LoggedInButton />
    }
    return <SignInButton />
}
