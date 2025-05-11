"use server"

import { prisma } from "@/lib/prisma"

export const NewBrandAction = async (input: { name: string }) => {
    try {
        const brand = await prisma.carType.create({
            data: {
                name: input.name
            },
        })

        return {
            success: true,
            data: brand
        }
    }
    catch (error: any) {
        console.log(error.message);

        return {
            success: false,
            error: "Une erreur est survenue lors de l'ajout du nouveau modèle"
        }
    }
}