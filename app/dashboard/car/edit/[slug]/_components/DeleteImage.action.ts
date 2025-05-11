"use server"

import { prisma } from "@/lib/prisma";
import { utapi } from "@/lib/server-action/uploadThings.utapi";

export const DeleteImageAction = async (id: string, fileKey: string | null) => {
    console.log(id, '---------------------', fileKey)

    if (!fileKey) {
        return {
            success: false,
            error: "Une erreur est survenue lors de la suppression de l'image, pas de fileKey"
        }
    }

    try {
        const IsDeleted = await utapi.deleteFiles(fileKey);

        if (!IsDeleted) {
            return {
                success: false,
                error: "Une erreur est survenue lors de la suppression de l'image"
            }
        }

        const DeleteInDb = await prisma.car.update({
            where: {
                id: id
            },
            data: {
                imageUrl: null,
                imageKey: null
            }
        })

        if (!DeleteInDb) {
            return {
                success: false,
                error: "Une erreur est survenue lors de la suppression de l'image, impossible de supprimer dans la base de données"
            }
        }

        return {
            success: true,
            data: DeleteInDb
        }

    } catch (error: any) {
        return {
            success: false,
            error: "Une erreur est survenue lors de la suppression de l'image"
        }
    }
}