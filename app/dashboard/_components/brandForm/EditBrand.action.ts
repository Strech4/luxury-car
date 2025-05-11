"use server"

import { prisma } from "@/lib/prisma"

export const EditBrandAction = async (input: { name: string }, id: string) => {
    try {
        const isExist = await prisma.carType.findUnique({
            where: {
                id: id
            }
        })

        if (!isExist) {
            throw new Error("Le modèle n'existe pas")
        }

        const EditBrand = await prisma.carType.update({
            where: {
                id: id
            },
            data: {
                name: input.name
            }
        })

        if (!EditBrand) {
            throw new Error("Une erreur est survenue lors de la modification du modèle")
        }

        return {
            success: true,
            data: EditBrand
        }

    } catch (error: any) {
        return {
            success: false,
            error: "Une erreur est survenue lors de la modification du modèle"
        }
    }
}