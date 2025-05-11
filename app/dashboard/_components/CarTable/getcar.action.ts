"use server"

import { getUser } from "@/lib/auth-session"
import { prisma } from "@/lib/prisma"

export const GetCarAction = async () => {
    const user = await getUser()
    if (user?.role !== "admin") throw new Error("Non autorisé")

    try {

        const cars = await prisma.car.findMany({
            include: {
                brand: {
                    select: {
                        name: true
                    }
                }
            }
        });
        if (!cars) throw new Error("Aucun véhicule trouvé")

        return {
            success: true,
            data: cars
        }

    } catch (error: any) {
        return {
            success: false,
            error: "Une erreur est survenue lors de la récupération des données..."
        }
    }

}
