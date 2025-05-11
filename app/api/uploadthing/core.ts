import { getUser } from "@/lib/auth-session";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";


const f = createUploadthing({
    errorFormatter: (err) => {
        console.error("Error uploading file", err.message);
        console.error("  - Above error caused by:", err.cause);

        return { message: err.message };
    },
});

export const CarImageUploader = {
    imageUploader: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    },
        { awaitServerData: false },
    )
        .middleware(async () => {
            const user = await getUser();
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            if (!metadata.userId) {
                throw new UploadThingError("Metadata is missing userId");
            }
            return {
                fileUrl: file.ufsUrl,
                fileKey: file.key,
            };
        }),
} satisfies FileRouter;

export type CarImageUploaderType = typeof CarImageUploader;
