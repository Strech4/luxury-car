"use server"

import { cache } from "react"
import { prisma } from "../prisma"

export const GetCarAction = async () => {
    const cars = await prisma.car.findMany({
        where: {
            available: true
        },
        select: {
            name: true,
            brand: {
                select: {
                    name: true
                }
            },
            seats: true,
            maxSpeed: true,
            safe: true,
            isNew: true,
            imageUrl: true,
            EngineTorque: true,
            powerFul: true,
        }
    })

    if (!cars) {
        return {
            success: false,
            error: "Une erreur est survenue lors de la récupération des données revenez plus tard..."
        }
    }

    return {
        success: true,
        data: cars
    }
}

export const GetCarsActionCached = cache(GetCarAction)