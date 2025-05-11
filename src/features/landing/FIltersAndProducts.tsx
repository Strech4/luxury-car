"use client"
import { Input } from '@/components/ui/input'
import type { CarType } from '@/lib/types/landing'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { Cars } from './Cars'

export const FIltersAndProducts = ({ cars }: { cars: CarType[] }) => {

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
        <section className='max-w-7xl mx-auto'>
            <div>
                <div className='relative max-w-xl mx-auto'>
                    <Input
                        className='pr-10 w-full mx-auto rounded-full'
                        placeholder='BMW M5, Porsche Panamera, Avion de chasse'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Search
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        size={18}
                    />
                </div>
                <p className='text-center text-muted-foreground text-xs mt-2'>
                    Découvrez notre {" "}
                    <Link target='_blank' href="https://www.toutes-les-couleurs.com/code-couleur-rvb.php" className='underline'>palette de couleurs</Link>
                </p>
            </div>
            <div className=''>
                <Cars cars={filteredCars} />
            </div>
        </section>
    )
}
