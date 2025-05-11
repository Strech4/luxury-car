"use client"
import { useZodForm } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { EditCarFormSchema, EditCarFormSchemaType } from './EditCarFormSchema';
import { Car } from '@/generated/prisma';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { EditCarAction } from './EditCar.action';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/features/form/SubmitButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CarType } from '@/lib/types/landing';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DeleteImageAction } from './DeleteImage.action';
import { useUploadThing } from '@/lib/uploadthing/uploadthing';

export const EditCarForm = ({ car, brands }: { car: Car, brands: { id: string; name: string; }[] }) => {

    const [imageData, setImageData] = useState<{ url: string; key: string } | null>(null);

    const router = useRouter();

    const form = useZodForm({
        schema: EditCarFormSchema,
        defaultValues: {
            id: car.id,
            name: car.name,
            maxSpeed: car.maxSpeed,
            seats: car.seats,
            safe: car.safe,
            EngineTorque: car.EngineTorque,
            powerFul: car.powerFul,
            brandId: car.brandId,
            isNew: car.isNew,
            available: car.available,
        },
    });

    const mutation = useMutation({
        mutationFn: async (values: EditCarFormSchemaType) => {
            console.log(values)

            const result = await EditCarAction(values);

            if (!result.success) {
                throw new Error(result.error);
            }

            return result.data;
        },
        onSuccess: (data) => {
            toast.success(`Véhicule Modifier avec succès}`)
            form.reset()
            router.push("/dashboard")
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
            onSubmit={async (values: EditCarFormSchemaType) => {
                await mutation.mutateAsync(values);
            }}
            className='mt-5'
        >
            <div className="grid grid-cols-12 gap-3">
                <Card className="col-span-12 md:col-span-6 lg:col-span-4">
                    <CardContent className='flex flex-col gap-2'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom du véhicule</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Nom du véhicule"
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
                                            placeholder="500"
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

                        <FormField
                            control={form.control}
                            name="seats"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre de places</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Nom du véhicule"
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
                    </CardContent>
                </Card>

                <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Modifier l'image</CardTitle>
                            <CardDescription>
                                Attention, une seule image par véhicule. Supprimez l'ancienne image pour modifier.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-3'>
                            {car.imageUrl ? (
                                <div className='w-fit relative'>
                                    <Image
                                        src={car.imageUrl}
                                        alt={`Preview ${car.name}`}
                                        className='object-contain object-center size-32 rounded-md select-none border'
                                        width={1980}
                                        height={1080}
                                    />
                                    <div
                                        className='absolute top-0 text-center text-xs p-2 border rounded-tr-md rounded-tl-md bg-white w-full  cursor-pointer'
                                        onClick={async () => {
                                            const result = await DeleteImageAction(car.id, car.imageKey)

                                            if (!result.success) {
                                                toast.error(result.error)
                                                return
                                            }

                                            toast.success("Image supprimée avec succès")
                                            router.refresh()
                                        }}
                                    >
                                        Supprimer l'image
                                    </div>
                                </div>
                            ) : (
                                <div>
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
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className='h-fit col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-3'>
                    <Card>
                        <CardContent>
                            <LoadingButton loading={mutation.isPending} type="submit" size="sm" className="w-full">
                                Enregistrer les modifications
                            </LoadingButton>
                        </CardContent>
                    </Card>

                    {/*  <Card >
                        <CardHeader>
                            <CardTitle>Supprimer le véhicule</CardTitle>
                            <CardDescription>
                                Attention cette action est définitive et ne peut pas être annulée.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-3'>
                            <Button variant="destructive" disabled>
                                Supprimer le véhicule
                            </Button>
                        </CardContent>
                    </Card> */}
                </div>

            </div>
        </Form >
    )
}
