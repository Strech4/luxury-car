import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export const LoggedInButton = () => {
    return <Link
        className={cn(
            buttonVariants({ size: "sm", variant: "outline", }),
            ""
        )}
        href={`/user`}
    >
        Mon compte
    </Link>
}
