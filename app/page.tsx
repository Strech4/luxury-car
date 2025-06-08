import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { Skeleton } from "@/components/ui/skeleton";
import { FIltersAndProducts } from "@/features/landing/FIltersAndProducts";
import { Hero } from "@/features/landing/Hero";
import { GetCarAction } from "@/lib/server-action/get-cars.action";
import { Suspense } from "react";

export default async function Home() {

    const cars = await GetCarAction();

    if (!cars.success || !cars.data) {
        return <main className="p-5">
            <Card className="max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle>
                        Oups un probleme est survenu...
                    </CardTitle>
                    <CardDescription>
                        Une erreur est survenue lors de la récupération des données revenez plus tard. si cette erreur persiste, contactez le développeur.
                    </CardDescription>
                </CardHeader>
            </Card>
        </main>
    }

    return (
        <main className="p-5">
            {/*  <Hero /> */}
            <Suspense fallback={<SuspenseFallback />}>
                <FIltersAndProducts cars={cars.data} />
            </Suspense>
        </main>
    );
}

const SuspenseFallback = () => {
    return <section className='max-w-7xl mx-auto'>
        <div>
            <Skeleton className="max-w-xl mx-auto h-8 rounded-full" />
            <Skeleton className="max-w-56 mx-auto mt-2 h-2" />
        </div>
        <div className="mt-10">
            <Loader className="text-muted-foreground mx-auto" />
        </div>
    </section>
}