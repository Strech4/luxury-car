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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getBrandAction } from './getbrand.acion'
import { Button, buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { OptionContext } from './OptionContext'


export const BrandTable = async () => {
    const brands = await getBrandAction();

    if (brands.error) {
        return <Card className='col-span-12 sm:col-span-6 lg:col-span-4'>
            <CardHeader>
                <CardTitle>Aucune marque trouvée</CardTitle>
                <CardDescription>
                    Si cela ne semble pas normal, veuillez contacter le développeur.
                </CardDescription>
            </CardHeader>
            <CardContent className='flex justify-between'>
                <p>Ajouté votre première marque</p>
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
        <Card className='col-span-12 sm:col-span-6 lg:col-span-4 h-fit'>
            <CardHeader>
                <CardTitle>Marques des véhicules existantes</CardTitle>
                <CardDescription>
                    Cliquez avec le bouton droit pour accéder au menu contextuel pour modifier ou supprimer une marque.
                </CardDescription>

            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>Marques des véhicules</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead className="text-right">Nombre de véhicules</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className=''>
                        {brands.data?.map((item, idx) => (
                            <OptionContext
                                key={idx}
                                name={item.name}
                                id={item.id}
                            >
                                <TableRow className='w-full'>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="text-right">{item._count.cars}</TableCell>
                                </TableRow>
                            </OptionContext>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
