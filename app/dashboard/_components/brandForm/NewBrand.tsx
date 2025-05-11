import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { BrandForm } from './BrandForm'

export const NewBrand = () => {
    return (
        <Card className='col-span-12 sm:col-span-6 lg:col-span-4 h-fit'>
            <CardHeader>
                <CardTitle>Ajouter un modèle de véhicule</CardTitle>
            </CardHeader>
            <CardContent>
                <BrandForm />
            </CardContent>
        </Card>
    )
}
