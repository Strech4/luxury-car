import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { OptionContext } from './OptionContext';
import Image from 'next/image';

interface CarFiltersProps {
    id: string;
    name: string;
    brandId: string;
    maxSpeed: string;
    seats: string;
    isNew: boolean;
    available: boolean;
    safe: string;
    EngineTorque: string;
    powerFul: string;
    imageUrl: string | null;
    imageKey: string | null;
    createdAt: Date;
    updatedAt: Date;
    brand: {
        id: string;
        name: string;
    };
}


export const CarTablesDeux = ({ cars }: { cars: CarFiltersProps[] }) => {
    return (
        <Table className='mt-2'>
            <TableCaption>véhicules existants</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className='w-[100px]'>Image</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Marque</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cars.map((item, idx) => (
                    <OptionContext
                        key={idx}
                        name={item.name}
                        id={item.id}
                    >
                        <TableRow>
                            <TableCell className='w-[100px]'>
                                <Image
                                    src={item.imageUrl || "/images/placeholder.png"}
                                    alt={`Preview ${item.name}`}
                                    className='size-14 rounded-sm object-contain'
                                    width={200}
                                    height={200}
                                />
                                {/* <div className='size-10 bg-black rounded-sm' /> */}
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.brand.name}</TableCell>
                        </TableRow>
                    </OptionContext>
                ))}
            </TableBody>
        </Table>
    )
}
