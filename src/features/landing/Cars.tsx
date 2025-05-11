import type { CarType } from '@/lib/types/landing'
import Image from 'next/image';
import React from 'react'
import { CarDialog } from './CarDialog';

export const Cars = ({ cars }: { cars: CarType[] }) => {
    // Group cars by brand
    const groupedCars = cars.reduce((acc, car) => {
        const brandName = car.brand.name;
        if (!acc[brandName]) {
            acc[brandName] = [];
        }
        acc[brandName].push(car);
        return acc;
    }, {} as Record<string, CarType[]>);

    return (
        <div className='mt-10 flex flex-col gap-10'>
            {Object.entries(groupedCars).map(([brand, cars]) => (
                <div
                    key={brand}
                    className='flex flex-col gap-5'
                >
                    <h2 className='font-medium text-2xl'>
                        {brand}
                    </h2>
                    <div className='flex flex-wrap gap-5'>
                        {cars.map((car, idx) => (
                            <CarDialog
                                car={car}
                                key={idx}
                            >
                                <div
                                    className='relative max-w-fit flex flex-col hover:scale-105 transition-transform duration-150 cursor-pointer'
                                >

                                    {car.isNew ? (
                                        <div className='absolute right-0 px-2 py-1 bg-gray-100 backdrop-blur-sm rounded-tr-md rounded-bl-md'>
                                            <p className='text-xs'>Nouveau</p>
                                        </div>
                                    ) : null}

                                    <div className=''>
                                        <Image
                                            src={car.imageUrl || "/images/placeholder.png"}
                                            alt={`Preview ${car.name}`}
                                            className='object-contain object-center size-40 rounded-md border select-none p-2'
                                            width={1980}
                                            height={1080}
                                            priority
                                        />
                                    </div>
                                    <p className='text-xs mt-1 max-w-40'>
                                        {car.name}
                                    </p>
                                </div>
                            </CarDialog>
                        ))}


                    </div>
                </div>
            ))}
        </div>
    )
}
