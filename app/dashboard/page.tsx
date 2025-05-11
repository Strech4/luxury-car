import React from 'react'
import { BrandTable } from './_components/BrandTable/BrandTable'
import { GetCarAction } from './_components/CarTable/getcar.action'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CarFiltersAndTable } from './_components/CarTable/CarFiltersAndTable'

export interface CarFiltersProps {
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

export default async function page() {

    const cars = await GetCarAction();

    if (cars.error) {
        return <Card className='col-span-12 sm:col-span-6 lg:col-span-4'>
            <CardHeader>
                <CardTitle>Aucun véhicule trouvé</CardTitle>
                <CardDescription>
                    Si cela ne semble pas normal, veuillez contacter le développeur.
                </CardDescription>
            </CardHeader>
            <CardContent className='flex justify-between'>
                <p>Ajouté votre premier véhicule</p>
                <div>
                    <Link
                        href="/dashboard/new"
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                size: "icon",
                            }),
                            "size-8"
                        )}
                    >
                        <Plus size={18} />
                    </Link>
                </div>
            </CardContent>
        </Card>
    }


    return (
        <main className='grid grid-cols-12 gap-5'>
            <CarFiltersAndTable cars={cars.data as CarFiltersProps[]} />
            <BrandTable />
        </main>
    )
}
