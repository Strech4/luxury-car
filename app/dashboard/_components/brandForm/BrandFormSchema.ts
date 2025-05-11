import { z } from "zod";

export const BrandFormSchema = z.object({
    name: z.string({ required_error: "Nom requis" }).min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
});

export type BrandFormSchemaType = z.infer<typeof BrandFormSchema>;