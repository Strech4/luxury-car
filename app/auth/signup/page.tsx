import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SignUpForm } from "./SignUpForm";

export default function SignUp() {

    return (
        <main className="h-[calc(100vh-48px)] w-full flex justify-center items-center">
            <Card className="z-50 rounded-md rounded-t-none max-w-md">
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Inscription</CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                        Entrez vos informations pour créer un compte
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                </CardContent>
                <CardFooter>
                    <div className="flex justify-center w-full border-t py-4">
                        <span className="text-center text-xs text-neutral-500">
                            Vous avez déja un compte ?{" "}
                            <Link href="/auth/signin" className="underline text-neutral-500">
                                Se connecter
                            </Link>
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}