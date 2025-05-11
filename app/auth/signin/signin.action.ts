"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function signInAction(values: {
    email: string
    password: string
}) {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email: values.email,
                password: values.password,
                callbackURL: "/"
            },
            headers: await headers(),
            asResponse: true
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "Une erreur est survenue lors de la connexion")
        }

        return { success: true }
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Une erreur est survenue lors de la connexion"
        }
    }
} 