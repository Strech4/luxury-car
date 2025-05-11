"use client"
import { Input } from "@/components/ui/input";
import React from 'react'
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
import { useMutation } from '@tanstack/react-query';
import { LoadingButton } from "@/features/form/SubmitButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInAction } from "./signin.action";
import { SignInFormSchema, type SignInFormSchemaType } from "./SignInFormSchema";

export const SignInForm = () => {
    const router = useRouter();

    const form = useZodForm({
        schema: SignInFormSchema,
        defaultValues: { email: "", password: "" },
    });

    const mutation = useMutation({
        mutationFn: async (values: SignInFormSchemaType) => {
            const result = await signInAction(values)

            if (!result.success) {
                throw new Error(result.error)
            }

            router.push("/user")
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    return (
        <Form
            form={form}
            onSubmit={async (values: SignInFormSchemaType) => {
                await mutation.mutateAsync(values);
            }}
            className="flex flex-col gap-2"
        >
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="john.doe@example.com"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                            <Input
                                type="password"
                                placeholder="Mot de passe"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <LoadingButton loading={mutation.isPending} type="submit" size="sm" className="w-full">
                Se connecter
            </LoadingButton>
        </Form>
    )
}
