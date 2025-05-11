import { z } from "zod";


export const EditCarFormSchema = z.object({
    id: z.string(),
    name: z.string(),
    maxSpeed: z.string(),
    seats: z.string(),
    safe: z.string(),
    EngineTorque: z.string(),
    powerFul: z.string(),
    brandId: z.string(),
    isNew: z.boolean(),
    available: z.boolean(),
    image: z.string().optional(),
    imageKey: z.string().optional(),
})

export type EditCarFormSchemaType = z.infer<typeof EditCarFormSchema>;