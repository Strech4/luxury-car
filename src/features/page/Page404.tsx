import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export const Page404 = () => {
    return (
        <main className="flex flex-col items-center gap-8 ">
            <div className="max-w-lg space-y-3 text-center">
                <p className="relative rounded w-fit mx-auto bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm md:text-lg font-semibold">404</p>
                <h1 className="scroll-m-20 font-caption text-4xl font-extrabold tracking-tight lg:text-5xl">Page non trouvée</h1>
                <p>
                    Désolé, nous n'avons pas trouvé la page que vous cherchez.
                </p>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/" className={buttonVariants({ variant: "invert" })}>
                    Retourner à l'accueil
                </Link>
                {/* <ContactSupportDialog /> */}
            </div>
        </main >
    )
}
