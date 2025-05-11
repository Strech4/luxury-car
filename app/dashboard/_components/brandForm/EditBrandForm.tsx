"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useZodForm } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import React from 'react'
import { EditBrandSchema, EditBrandSchemaType } from './EditBrandSchema';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/features/form/SubmitButton';
import { EditBrandAction } from './EditBrand.action';

export const EditBrandForm = ({ id, name }: { id: string, name: string }) => {

    const router = useRouter();

    const form = useZodForm({
        schema: EditBrandSchema,
        defaultValues: { name },
    });

    const mutation = useMutation({
        mutationFn: async (values: EditBrandSchemaType) => {
            const result = await EditBrandAction(values, id)

            if (!result.success) {
                throw new Error(result.error)
            }

            return result.data
        },
        onSuccess: (data) => {
            toast.success(`Marque Modifier avec succès ${data?.name}`)
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
            onSubmit={async (values: EditBrandSchemaType) => {
                await mutation.mutateAsync(values);
            }}
            className="flex flex-col gap-2"
        >
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nouveau nom</FormLabel>
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
                Modifier le nom
            </LoadingButton>
        </Form>
    )
}
