"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function signUpAction(values: {
    firstName: string
    lastName: string
    email: string
    password: string
}) {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                email: values.email,
                password: values.password,
                name: `${values.firstName} ${values.lastName}`,
            },
            headers: await headers(),
            asResponse: true
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "Une erreur est survenue lors de l'inscription")
        }

        return { success: true }
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Une erreur est survenue lors de l'inscription"
        }
    }
}