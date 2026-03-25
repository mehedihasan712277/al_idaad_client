import type { Metadata } from "next";
import "./globals.css";
import { DM_Serif_Display, Outfit, Poppins, Proza_Libre } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/components/shared/CartContext";

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

// const belanosima = Belanosima({
//     subsets: ["latin"],
//     weight: ["400", "600", "700"],
//     variable: "--font-belanosima",
//     display: "swap",
// });

// const oswald = Oswald({
//     subsets: ["latin"],
//     weight: ["300", "400", "500", "600", "700"],
//     variable: "--font-oswald",
//     display: "swap",
// });

const dmSerif = DM_Serif_Display({
    subsets: ["latin"],
    weight: ["400"], // only available weight
    variable: "--font-dm-serif",
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
                className={`${outfit.variable} ${poppins.variable} ${proza.variable} ${dmSerif.variable} antialiased bg-bg_main text-text_dark font-outfit select-none`}
            >
                <CartProvider>
                    <div className="max-w-480 mx-auto pt-18 md:pt-25">
                        <Navbar></Navbar>
                        {children}
                        <Toaster position="bottom-right" reverseOrder={false} />

                        <Footer></Footer>
                    </div>
                </CartProvider>
            </body>
        </html>
    );
}
