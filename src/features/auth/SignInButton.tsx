import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export const SignInButton = () => {
    return (
        <>
            <Link
                href="/auth/signin"
                className={cn(
                    buttonVariants(),
                )}
            >
                Connexion
            </Link>
            <Link
                href="/auth/signup"
                className={cn(
                    buttonVariants({ variant: "outline" }),
                )}
            >
                Inscription
            </Link>
        </>
    )
}
