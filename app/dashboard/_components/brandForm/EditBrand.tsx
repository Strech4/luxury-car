import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { EditBrandForm } from './EditBrandForm'


export const EditBrand = ({ id, name }: { id: string, name: string }) => {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Changer le nom de la marque {name}</DialogTitle>
            </DialogHeader>
            <div>
                <EditBrandForm id={id} name={name} />
            </div>
        </DialogContent>
    )
}
