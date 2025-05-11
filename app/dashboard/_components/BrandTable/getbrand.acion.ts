"use server"

import { getUser } from "@/lib/auth-session"
import { prisma } from "@/lib/prisma"

export const getBrandAction = async () => {
    const session = await getUser()
    if (!session) throw new Error("Vous n'êtes pas connecté")

    try {
        const brands = await prisma.carType.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        cars: true
                    }
                }
            }
        })

        if (!brands) {
            throw new Error("Aucun marque trouvée")
        }

        return {
            success: true,
            data: brands
        }

    } catch (error: any) {
        return {
            success: false,
            error: "Erreur lors de la récupération des données..."
        }
    }

}