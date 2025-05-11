import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export const AuthAdminButton = ({ role }: { role: string }) => {
    return (
        <>
            {role === "admin" ? (
                <Link
                    href="/dashboard"
                    className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full"
                    )}
                >
                    Panel admin
                </Link>
            ) : null}
        </>
    )
}
