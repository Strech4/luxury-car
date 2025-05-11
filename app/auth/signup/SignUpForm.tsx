"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/features/form/SubmitButton';
import { signUp } from '@/lib/auth-client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import { SignUpFormSchema, SignUpFormSchemaType } from './SignUpFormSchema';
import { signUpAction } from './signup.action';

export const SignUpForm = () => {
    const router = useRouter();

    const form = useZodForm({
        schema: SignUpFormSchema,
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const mutation = useMutation({
        mutationFn: async (values: SignUpFormSchemaType) => {
            const result = await signUpAction({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password
            })

            if (!result.success) {
                throw new Error(result.error)
            }

            router.push("/user")
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    });

    return (
        <Form
            form={form}
            onSubmit={async (values) => {
                await mutation.mutateAsync(values);
            }}
            className="grid gap-2"
        >
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prénom</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
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
                                placeholder="Minimum 8 caractères"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirmer le mot de passe</FormLabel>
                        <FormControl>
                            <Input
                                type="password"
                                placeholder="Confirmer le mot de passe"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <LoadingButton loading={mutation.isPending} type="submit" size="sm" className="w-full">
                S'inscrire
            </LoadingButton>
        </Form>
    )
}
