import { z } from "zod";


export const EditBrandSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
})

export type EditBrandSchemaType = z.infer<typeof EditBrandSchema>;