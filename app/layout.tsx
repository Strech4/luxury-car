import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";
import { Nav } from "@/features/navigation/Nav";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Providers } from "./Providers";
import { Background } from "@/features/landing/Background";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Luxury Cars",
    description: "Que vous cherchiez puissance, élégance ou performance, votre future bolide vous attend en ligne dès maintenant.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.className} antialiased min-h-dvh relative`}
            >
                {/*   <Background /> */}
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    disableTransitionOnChange
                >
                    <Providers>
                        <Nav />
                        {children}
                        <Toaster />
                    </Providers>
                </ThemeProvider>
            </body>
        </html >
    );
}
