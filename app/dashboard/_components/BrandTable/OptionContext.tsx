import React from 'react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { toast } from 'sonner'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import Link from 'next/link'
import { EditBrand } from '../brandForm/EditBrand'


export const OptionContext = ({ children, name, id }: { children: React.ReactNode, name: string, id: string }) => {
    return (
        <Dialog>
            <ContextMenu>
                <ContextMenuTrigger
                    className='w-full'
                    asChild
                >
                    {children}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem inset className='font-medium'>
                        {name}
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <DialogTrigger asChild>
                        <ContextMenuItem>
                            Éditer le nom
                        </ContextMenuItem>
                    </DialogTrigger>
                    <form>
                        <button
                            formAction={async () => {
                                "use server"
                                const isdelete = await prisma.carType.delete({
                                    where: {
                                        id: id
                                    }
                                })
                                if (!isdelete) {
                                    throw new Error("Une erreur est survenue lors de la suppression de la marque")
                                }
                                revalidatePath("/dashboard")
                            }}
                        >
                            <ContextMenuItem
                            >
                                Supprimer la marque
                            </ContextMenuItem>
                        </button>
                    </form>
                </ContextMenuContent>
            </ContextMenu>
            <EditBrand id={id} name={name} />
        </Dialog >
    )
}
