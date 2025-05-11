import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { NewCarForm } from './NewCarForm'
import { getBrandAction } from '../BrandTable/getbrand.acion';
import { type CarType } from '@/generated/prisma';

export const NewCar = async () => {

    const brands = await getBrandAction();

    if (!brands.data) {
        return <p>Erreur lors de la récupération de certaine données</p>
    }

    return (
        <Card className='col-span-12 sm:col-span-6 lg:col-span-6 h-fit'>
            <CardHeader>
                <CardTitle>Ajouter un nouveau véhicule</CardTitle>
            </CardHeader>
            <CardContent>
                <NewCarForm brands={brands.data} />
            </CardContent>
        </Card>
    )
}
