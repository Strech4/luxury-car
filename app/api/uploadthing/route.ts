import { createRouteHandler } from "uploadthing/next";
import { CarImageUploader } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
    router: CarImageUploader,
    // config: {},
});
