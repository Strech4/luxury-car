import { z } from "zod";

export const SignUpFormSchema = z.object({
    firstName: z.string({ required_error: "Prénom requis" }).min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
    lastName: z.string({ required_error: "Nom requis" }).min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    email: z.string({ required_error: "Email requis" }).email({ message: "L'email est invalide" }),
    password: z.string({ required_error: "Mot de passe requis" }).min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
    confirmPassword: z.string({ required_error: "Confirmer le mot de passe requis" }).min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
});

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;