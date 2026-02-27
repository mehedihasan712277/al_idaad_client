"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavItems = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: "/", label: "Home" },
        { href: "/all-products", label: "All Products" },
        { href: "/blog", label: "Blog" },
    ];

    return (
        <>
            {/* Desktop Nav */}
            <div className="hidden lg:flex gap-6 items-center">
                {links.map(({ href, label }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`relative pb-1 transition-colors duration-200 group font-bold
                                ${isActive ? "text-blue-600" : "text-text_normal hover:text-blue-500"}
                            `}
                        >
                            {label}
                            <span
                                className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out
                                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                                `}
                            />
                        </Link>
                    );
                })}

                <button className="w-12 h-12 hover:bg-brand/50 active:scale-95 transition duration-150 flex justify-center items-center rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#17313e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                </button>
            </div>

            {/* Mobile: cart + menu icon only (logo is already in navbar) */}
            <div className="flex lg:hidden items-center gap-1">
                <button className="w-12 h-12 hover:bg-brand/50 active:scale-95 transition duration-150 flex justify-center items-center rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#17313e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                </button>

                <button
                    onClick={() => setIsOpen(true)}
                    className="w-12 h-12 hover:bg-brand/50 active:scale-95 transition duration-150 flex justify-center items-center rounded-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#17313e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </button>
            </div>

            {/* Overlay */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden
                    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
            />

            {/* Slide-in Drawer from right */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                `}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <span className="font-bold text-lg text-text_normal tracking-tight">Menu</span>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition duration-150"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#17313e"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Drawer Links */}
                <nav className="flex flex-col px-4 py-4 gap-1">
                    {links.map(({ href, label }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setIsOpen(false)}
                                className={`relative px-3 py-3 rounded-lg font-bold transition-colors duration-200 group overflow-hidden
                                    ${isActive ? "text-blue-600 bg-blue-50" : "text-text_normal hover:text-blue-500 hover:bg-gray-50"}
                                `}
                            >
                                {label}
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out
                                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                                    `}
                                />
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
};

export default NavItems;
