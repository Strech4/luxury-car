"use client"
import { Form, useZodForm } from '@/components/ui/form';
import React, { useState } from 'react'
import { CarFormSchema, CarFormSchemaType } from './CarFormSchema';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { NewCarAction } from './car.action';
import { toast } from 'sonner';
import { useUploadThing } from '@/lib/uploadthing/uploadthing';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton } from '@/features/form/SubmitButton';


interface CarBrandProps {
    brands: {
        id: string;
        name: string;
        _count: {
            cars: number;
        };
    }[];
}

export const NewCarForm = ({ brands }: CarBrandProps) => {

    const [imageData, setImageData] = useState<{ url: string; key: string } | null>(null);

    const router = useRouter();

    const form = useZodForm({
        schema: CarFormSchema,
        defaultValues: {
            name: "",
            maxSpeed: "0",
            seats: "0",
            safe: "0",
            EngineTorque: "0",
            powerFul: "0",
            brandId: "",
            isNew: false,
            available: true,
            image: "",
            imageKey: "",
        },
    });

    const mutation = useMutation({
        mutationFn: async (values: CarFormSchemaType) => {
            const car = await NewCarAction(values)

            if (!car.success) {
                throw new Error(car.error)
            }

            return car.data
        },
        onSuccess: (data) => {
            toast.success(`Le véhicule a été ajouté avec succès ${data?.name}`)
            router.refresh()
            form.reset()
            setImageData(null)
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            setImageData({
                url: res[0].ufsUrl,
                key: res[0].key
            });
            form.setValue("image", res[0].ufsUrl);
            form.setValue("imageKey", res[0].key);
        },
        onUploadError: (error) => {
            toast.error(`Erreur lors de l'upload de l'image ${error.message}`);
        },
    });


    return (
        <Form
            form={form}
            onSubmit={async (values: CarFormSchemaType) => {
                await mutation.mutateAsync(values);
            }}
            className=""
        >
            <div className='grid grid-cols-12 gap-2'>
                <div className='col-span-12 md:col-span-6 grid gap-3'>
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image du véhicule</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                await startUpload([file]);
                                            }}
                                        />
                                        {isUploading && <span>Upload en cours...</span>}
                                        {imageData?.url && (
                                            <img
                                                src={imageData.url}
                                                alt="Preview"
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom du véhicule</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="P1 GTR 'James Hunt Edition' Light"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="maxSpeed"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Vitesse maximale (Km/h)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="350"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="powerFul"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Puissance (Chevaux)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="1200"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="EngineTorque"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Puissance du moteur (Nm couple)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="2000"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='col-span-12 md:col-span-6  grid gap-3'>
                    <FormField
                        control={form.control}
                        name="seats"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre de places</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="4"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="safe"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Place dans le coffre</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="55"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="brandId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Marque du véhicule</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder="Sélectionnez une marque" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {brands.map((brand) => (
                                            <SelectItem key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isNew"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex items-center space-x-2 py-2">
                                        <Switch
                                            id="isNew"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label
                                            htmlFor="isNew"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Nouveau véhicule ?
                                        </Label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="available"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex items-center space-x-2 py-2">
                                        <Switch
                                            id="available"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <Label
                                            htmlFor="available"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Le véhicule est disponible a l'achat?
                                        </Label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <LoadingButton
                type='submit'
                size='sm'
                className='w-full mt-3'
                loading={mutation.isPending}
            >
                Ajouter le véhicule
            </LoadingButton>
        </Form>
    )
}
