import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogContentCustom,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CarType } from '@/lib/types/landing'
import Image from 'next/image'


export const CarDialog = ({
    children,
    car
}: {
    children: React.ReactNode,
    car: CarType
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContentCustom>
                <DialogHeader>
                    <div>
                        <Image
                            src={car.imageUrl || "/images/placeholder.png"}
                            alt={`Preview ${car.name}`}
                            priority
                            className='select-none'
                            width={1980}
                            height={1080}
                        />
                    </div>
                    <DialogTitle>
                        <div className='flex flex-col'>
                            <h3>
                                {car.brand.name} - {car.name}
                            </h3>
                            {car.isNew ? (
                                <p className='font-normal text-sm text-muted-foreground'>Nouveau</p>
                            ) : null}
                        </div>
                    </DialogTitle>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 mt-4'>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex justify-between'>
                                <p className='text-muted-foreground'>Vitesse Max</p>
                                <p>{car.maxSpeed} Km/h</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-muted-foreground'>Chevaux</p>
                                <p>{car.powerFul}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-muted-foreground'>Couple moteur</p>
                                <p>{car.EngineTorque} Nm</p>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <div className='flex justify-between'>
                                <p className='text-muted-foreground'>Places</p>
                                <p>{car.seats}</p>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-muted-foreground'>Coffre</p>
                                <p>{car.safe} L</p>
                            </div>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContentCustom>
        </Dialog>

    )
}


/* 

    place 
    vitesse max
    Coffre
    Nm Moteur
    chevaux
*/