"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { SignInForm } from "./SignInForm";
import Link from "next/link";

export default function SignIn() {


    return (
        <main className="h-[calc(100vh-48px)] w-full flex justify-center items-center">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Se connecter</CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                        Entrez votre email ci-dessous pour vous connecter à votre compte
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignInForm />
                </CardContent>
                <CardFooter>
                    <div className="flex justify-center w-full border-t py-4">
                        <span className="text-center text-xs text-neutral-500">
                            Vous n'avez pas de compte ?{" "}
                            <Link href="/auth/signup" className="underline text-neutral-500">
                                S'inscrire
                            </Link>
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </main>
    );
}