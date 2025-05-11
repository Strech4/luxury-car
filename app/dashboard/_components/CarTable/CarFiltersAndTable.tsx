"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import React, { useMemo, useState } from 'react'
import { CarTablesDeux } from './CarTablesDeux'
import { Car } from '@/generated/prisma'

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

export const CarFiltersAndTable = ({ cars }: { cars: CarFiltersProps[] }) => {

    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredCars = useMemo(() => {
        return cars.filter((car) => {
            const searchTerms = searchTerm.toLowerCase().split(' ');
            const matchesSearchTerm = searchTerms.every(term =>
                car.name.toLowerCase().includes(term) ||
                car.brand.name.toLowerCase().includes(term)
            );
            return matchesSearchTerm;
        });
    }, [cars, searchTerm]);

    return (
        <Card className='col-span-12 sm:col-span-12 lg:col-span-8 h-fit'>
            <CardHeader>
                <CardTitle>Model de véhicule</CardTitle>
                <CardDescription>
                    Cliquez avec le bouton droit pour accéder au menu contextuel pour modifier ou supprimer un modèle
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className=''>
                    <Input
                        placeholder='BMW M5, Porsche Panamera, Avion de chasse'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <CarTablesDeux cars={filteredCars} />
            </CardContent>
        </Card>
    )
}
