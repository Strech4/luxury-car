"use client"
import {
    generateReactHelpers,
} from "@uploadthing/react";
import { CarImageUploaderType } from "../../../app/api/uploadthing/core";

export const { useUploadThing } = generateReactHelpers<CarImageUploaderType>();

