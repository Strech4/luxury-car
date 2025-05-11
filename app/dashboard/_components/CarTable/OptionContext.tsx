import React from 'react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import Link from 'next/link'


export const OptionContext = ({ children, name, id }: { children: React.ReactNode, name: string, id: string }) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger
                className='w-full'
                asChild
            >
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className='min-w-[200px]'>
                <ContextMenuItem inset className='font-medium'>
                    {name}
                </ContextMenuItem>
                <ContextMenuSeparator />

                <ContextMenuItem
                    asChild
                >
                    <Link
                        href={`/dashboard/car/edit/${id}`}
                    >
                        Éditer
                    </Link>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu >
    )
}
