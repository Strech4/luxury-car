import React from 'react'
import { BrandForm } from '../_components/brandForm/BrandForm'
import { NewBrand } from '../_components/brandForm/NewBrand'
import { NewCar } from '../_components/carForm/NewCar'

export default function page() {
    return (
        <main className='grid grid-cols-12 gap-x-5'>
            <NewCar />
            <NewBrand />
        </main>
    )
}
