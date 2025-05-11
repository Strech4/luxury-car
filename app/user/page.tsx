import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction, CardFooter } from '@/components/ui/card'
import { getUser } from '@/lib/auth-session'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { UserIcon } from 'lucide-react'
import { AuthAdminButton } from '@/features/auth/AuthAdminButton'

export default async function page() {

    const user = await getUser()

    if (!user) {
        redirect('/auth/signin')
    }

    return (

        <Card className='max-w-md mx-auto mt-5'>
            <CardHeader>
                <CardTitle className='text-lg md:text-xl'>
                    Votre Compte
                </CardTitle>
                <CardDescription className='text-xs md:text-sm'>
                    Gérez vos informations personnelles et vos preferences
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <UserIcon className="size-12 border p-1 rounded-full" />
                        <div>
                            <h3 className="text-lg font-semibold">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <h4 className='text-sm font-medium'>Détails du compte</h4>
                        <div className='grid grid-cols-2 gap-2'>
                            <span className='text-muted-foreground'>Email:</span>
                            <span>{user.email}</span>
                            {user.name && (
                                <>
                                    <span className='text-muted-foreground'>Nom:</span>
                                    <span>{user.name}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
                <form className='w-full'>
                    <Button
                        formAction={async () => {
                            "use server"
                            await auth.api.signOut({
                                headers: await headers(),
                            })
                            redirect('/auth/signin')
                        }}
                        className='w-full'
                    >
                        Déconnexion
                    </Button>
                </form>
                <AuthAdminButton role={user.role} />
            </CardFooter>
        </Card >
    )
}
