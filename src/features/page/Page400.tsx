import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export const Page400 = () => {
    return (
        <main className="flex flex-col items-center gap-8">
            <div className="max-w-lg space-y-3 text-center">
                <p className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">400</p>
                <h1 className="scroll-m-20 font-caption text-4xl font-extrabold tracking-tight lg:text-5xl">Oh non ! Erreur inattendue.</h1>
                <p>
                    Il semble que nous rencontrions quelques difficultés techniques. Ne vous inquiétez pas,
                    notre équipe travaille dessus. En attendant, essayez de rafraîchir la page ou
                    revenez nous voir un peu plus tard.
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
