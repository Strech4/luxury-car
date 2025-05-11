"use server"

import { Car } from "@/generated/prisma"
import { getUser } from "@/lib/auth-session"
import { prisma } from "@/lib/prisma"
import { CarType } from "@/lib/types/landing"

export const EditCarAction = async (values: {
    id: string
    name: string
    maxSpeed: string
    seats: string
    safe: string
    EngineTorque: string
    powerFul: string
    brandId: string
    isNew: boolean
    available: boolean
    image?: string
    imageKey?: string
}) => {
    const user = await getUser()
    if (user?.role !== "admin") throw new Error("Non autorisé")

    try {

        const car = await prisma.car.update({
            where: {
                id: values.id
            },
            data: {
                name: values.name,
                maxSpeed: values.maxSpeed,
                seats: values.seats,
                safe: values.safe,
                EngineTorque: values.EngineTorque,
                powerFul: values.powerFul,
                brandId: values.brandId,
                isNew: values.isNew,
                available: values.available,
                imageUrl: values.image,
                imageKey: values.imageKey,
            }
        })

        if (!car) throw new Error("Une erreur est survenue lors de la modification du véhicule")

        return {
            success: true,
            data: car
        }

    } catch (error: any) {
        return {
            success: false,
            error: "Une erreur est survenue lors de la modification du véhicule"
        }
    }
}