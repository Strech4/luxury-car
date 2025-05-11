import React from 'react'

export const Hero = () => {
    return (
        <section className='flex flex-col my-10'>
            <div className='max-w-5xl w-full mx-auto'>
                <h2 className='text-4xl md:text-7xl lg:text-8xl font-bold text-center'>
                    Luxury{" "}<span className='underline decoration-yellow-400 decoration-[3px] underline-offset-8'>cars</span>
                </h2>
                <p className='text-muted-foreground text-center text-xl'>
                    LA CONCESSION N°1 DE SAINT-MARTIN
                </p>
            </div >
        </section >
    )
}
