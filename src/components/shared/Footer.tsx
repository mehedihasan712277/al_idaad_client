import facebook from "@/assets/facebook.png";
import whatsapp from "@/assets/whatsapp.png";
import mail from "@/assets/mail.png";
import call from "@/assets/call.png";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
    return (
        <div className="bg-[#181818] px-4 py-20 text-text_light">
            <div className="max-w-7xl mx-auto flex justify-between border-b border-gray-800 pb-8 mb-8">
                <div className="space-y-4">
                    <div className="pb-4 w-fit">
                        <p className="font-proza-libre text-4xl font-semibold">Al Idaad</p>
                        <p className="font-proza-libre">A symbol of trust, quality & elegency</p>
                    </div>
                    <div className="flex gap-6 items-center">
                        <a href="">
                            <Image src={facebook} alt="idaad facbook"></Image>
                        </a>
                        <a href="">
                            <Image src={whatsapp} alt="idaad whatsapp"></Image>
                        </a>
                        <a href="">
                            <Image src={mail} alt="idaad email"></Image>
                        </a>
                        <a href="">
                            <Image src={call} alt="idaad phone number"></Image>
                        </a>
                    </div>
                </div>

                <div className="shrink-0 space-y-3">
                    <p className="text-xl">Contact Information</p>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ababab"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-mail-icon lucide-mail"
                        >
                            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                        </svg>
                        <p>abc@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ababab"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-phone-icon lucide-phone"
                        >
                            <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                        </svg>
                        <p>0123456789</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ababab"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-map-pin-icon lucide-map-pin"
                        >
                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <p>Agrabad, Chittagong</p>
                    </div>
                </div>

                <div className="shrink-0 flex flex-col gap-3">
                    <p className="text-xl">Links</p>
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                    <Link href="/all-products" className="hover:underline">
                        All Products
                    </Link>
                    <Link href="/blog" className="hover:underline">
                        Blogs
                    </Link>
                </div>
            </div>

            <div className=" flex justify-center gap-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ababab"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-copyright-icon lucide-copyright mt-1"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
                </svg>
                <p className="text-sm text-gray-500">All right reserved</p>
            </div>
        </div>
    );
};

export default Footer;
