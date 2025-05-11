import { z } from "zod";


export const CarFormSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    maxSpeed: z.string().min(1, "La vitesse maximale est requise"),
    seats: z.string().min(1, "Le nombre de places est requis"),
    safe: z.string().min(1, "La place dans le coffre est requise"),
    EngineTorque: z.string().min(1, "La puissance du moteur est requise"),
    powerFul: z.string().min(1, "La puissance est requise"),
    brandId: z.string().min(1, "La marque est requise"),
    isNew: z.boolean(),
    available: z.boolean(),
    image: z.string().min(1, "L'image est requise"),
    imageKey: z.string(),
})

export type CarFormSchemaType = z.infer<typeof CarFormSchema>;

