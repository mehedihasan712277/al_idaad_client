import type { Metadata } from "next";
import "./globals.css";
import { Outfit, Poppins, Proza_Libre } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    style: ["normal"],
    variable: "--font-outfit",
    display: "swap",
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
    display: "swap",
});

const proza = Proza_Libre({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-proza-libre",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Al Idaad",
    description: "Al Idaad is a clothing brand mainly sells Thobe and Islamic items",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${outfit.variable} ${poppins.variable} ${proza.variable} antialiased bg-bg_main text-text_dark font-outfit select-none`}
            >
                <div className="max-w-480 mx-auto pt-18 md:pt-25">
                    <Navbar></Navbar>
                    {children}
                    <Toaster position="bottom-right" reverseOrder={false} />

                    <Footer></Footer>
                </div>
            </body>
        </html>
    );
}
