import { Page404 } from '@/features/page/Page404'
import React from 'react'

export default function NotFoundPage() {
    return (
        <div className='flex min-h-screen flex-col'>
            <div className="flex flex-1 items-center justify-center">
                <Page404 />
            </div>
        </div>
    )
}
