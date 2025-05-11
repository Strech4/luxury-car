-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maxSpeed" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "safe" INTEGER NOT NULL,
    "EngineTorque" INTEGER NOT NULL,
    "powerFul" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "CarType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
