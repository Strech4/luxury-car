import { z } from "zod";

export const SignInFormSchema = z.object({
    email: z.string({ required_error: "Email requis" }).email("Email invalide"),
    password: z.string({ required_error: "Mot de passe requis" }),
});

export type SignInFormSchemaType = z.infer<typeof SignInFormSchema>;
