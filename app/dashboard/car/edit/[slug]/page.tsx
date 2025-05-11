import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { EditCarForm } from './_components/EditCarForm'

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const car = await prisma.car.findUnique({
        where: {
            id: slug
        },
        include: {
            brand: {
                select: {
                    name: true
                }
            }
        }
    })

    const brands = await prisma.carType.findMany({
        select: {
            id: true,
            name: true,
        }
    }) as { id: string; name: string }[];

    if (!car || !brands) {
        return <Card className='max-w-sm mx-auto mt-10'>
            <CardHeader>
                <CardTitle>Oups un probleme est survenu...</CardTitle>
                <CardDescription>
                    Il semblerait que le véhicule n'existe pas. si le probleme persiste, contactez le développeur.
                </CardDescription>
            </CardHeader>
            <CardContent className='flex justify-end'>
                <Link href="/dashboard" className={cn(
                    buttonVariants({ variant: "link" }),
                )}>
                    Retour à l'accueil
                </Link>
            </CardContent>
        </Card>
    }

    return (
        <main className=''>
            <div>
                <h1 className='font-medium text-2xl'>Édition de {car.brand.name} {car.name}</h1>
            </div>
            <div>
                <EditCarForm car={car} brands={brands} />
            </div>
        </main>
    )
}
