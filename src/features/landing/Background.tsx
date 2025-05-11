import Image from 'next/image'
import React from 'react'
import bgImage from "../../../public/bg.png"

export const Background = () => {
    return (
        <div className='absolute inset-0 w-full h-[calc(100vh-48px)] overflow-hidden -z-30 mt-12'>
            <Image
                src={bgImage}
                alt='Background'
                className='object-cover object-center blur-[4px] scale-105'
                width={1920}
                height={1080}
            />
        </div>
    )
}
