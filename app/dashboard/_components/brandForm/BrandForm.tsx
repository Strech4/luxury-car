"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/features/form/SubmitButton';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';
import { z } from 'zod';
import { NewBrandAction } from './brand.action';
import { BrandFormSchema, BrandFormSchemaType } from './BrandFormSchema';

export const BrandForm = () => {
    const router = useRouter();

    const form = useZodForm({
        schema: BrandFormSchema,
        defaultValues: { name: "", },
    });

    const mutation = useMutation({
        mutationFn: async (values: BrandFormSchemaType) => {
            const result = await NewBrandAction(values)

            if (!result.success) {
                throw new Error(result.error)
            }

            return result.data
        },
        onSuccess: (data) => {
            toast.success(`Marque ajoutée avec succès ${data?.name}`)
            router.refresh()
            form.reset()
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    return (
        <Form
            form={form}
            onSubmit={async (values: BrandFormSchemaType) => {
                await mutation.mutateAsync(values);
            }}
            className="flex flex-col gap-2"
        >
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nom de la marque</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="BMW - Aston Martin - Audi - Porsche"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <LoadingButton loading={mutation.isPending} type="submit" size="sm" className="w-full">
                Ajouter un modèle
            </LoadingButton>
        </Form>
    )
}
