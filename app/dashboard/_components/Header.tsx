import { Button, buttonVariants } from '@/components/ui/button'
import { InlineTooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
    return (
        <header className='w-full mb-5 flex justify-between items-center'>
            <div className='flex items-center gap-5'>
                <div>
                    <InlineTooltip title="Retour à l'accueil">
                        <Link className={cn(
                            "h-7 w-7",
                            buttonVariants({
                                variant: "outline",
                                size: "icon",
                            })
                        )}
                            href={`/`}
                        >
                            <ChevronLeft className="size-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </InlineTooltip>
                </div>
                <div>
                    <Link
                        href="/dashboard"
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                size: "sm",
                            })
                        )}
                    >
                        Accueil panel
                    </Link>
                </div>
            </div>
            <div>
                <Link
                    href="/dashboard/new"
                    className={cn(
                        buttonVariants({
                            variant: "default",
                            size: "sm",
                        })
                    )}
                >
                    Ajouter des modèles
                </Link>
            </div>
        </header>
    )
}
