"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

type CartItem = {
    url: string;
    title: string;
    price: string;
    category: string;
    quantity: number;
};

const Navbar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const [visible, setVisible] = useState(true);
    const [animate, setAnimate] = useState(false);
    const [fade, setFade] = useState(false);
    const visibleRef = useRef(visible);
    const animateRef = useRef(animate);
    const fadeRef = useRef(fade);

    const links = [
        { href: "/", label: "Home" },
        { href: "/all-products", label: "All Products" },
        { href: "/blog", label: "Blog" },
        { href: "/faq", label: "FAQ" },
        { href: "/contact", label: "Contact Us" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            let newVisible = visibleRef.current;
            let newAnimate = animateRef.current;
            let newFade = fadeRef.current;

            if (scrollY === 0) {
                newVisible = true;
                newAnimate = false;
                newFade = true;
            } else if (scrollY > 500) {
                newVisible = true;
                newAnimate = true;
                newFade = false;
            } else {
                newVisible = false;
                newAnimate = false;
                newFade = false;
            }

            if (newVisible !== visibleRef.current) {
                setVisible(newVisible);
                visibleRef.current = newVisible;
            }
            if (newAnimate !== animateRef.current) {
                setAnimate(newAnimate);
                animateRef.current = newAnimate;
            }
            if (newFade !== fadeRef.current) {
                setFade(newFade);
                fadeRef.current = newFade;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const loadCart = () => {
            const storedCart = localStorage.getItem("cart");
            setCartItems(storedCart ? JSON.parse(storedCart) : []);
        };
        loadCart();
        if (isCartOpen) loadCart();
    }, [isCartOpen]);

    const updateCart = (updatedCart: CartItem[]) => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    const increaseQty = (index: number) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity += 1;
        updateCart(updatedCart);
    };

    const decreaseQty = (index: number) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            updatedCart.splice(index, 1);
        }
        updateCart(updatedCart);
    };

    const removeItem = (index: number) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        updateCart(updatedCart);
    };

    const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <nav
                className={`
    fixed top-0 left-0 right-0 z-50
    border border-border
    transform
    ${visible ? "translate-y-0" : "-translate-y-full"}
    ${animate ? "transition-transform duration-500 ease-in-out" : "transition-none"}
    ${fade ? "opacity-0 animate-fadeIn" : "opacity-100"}
    ${animate ? "bg-black/70 border-none mx-3 mt-4 rounded-2xl" : "bg-bg_main"}
  `}
            >
                <div className="h-18 md:h-25 px-4 max-w-7xl mx-auto flex items-center">
                    {/* ── MOBILE LAYOUT (< lg): hamburger left | logo center | search+cart right ── */}
                    <div className="flex lg:hidden w-full items-center">
                        {/* Left: hamburger */}
                        <div className="flex items-center rotate-90">
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className={`relative w-10 h-10 hover:bg-brand/50 active:scale-95 transition duration-150 flex justify-center items-center rounded-full ${animate ? "text-white" : "text-text_normal"}`}
                                aria-label="Open menu"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
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

                        {/* Center: logo */}
                        <h1
                            className={`flex-1 text-center text-3xl font-bold font-proza-libre select-none
        ${animate ? "text-white" : "text-text_normal"}`}
                        >
                            Al Idaad
                        </h1>

                        {/* Right: search + cart */}
                        <div className="flex items-center gap-1">
                            <button
                                className={`relative w-10 h-10 hover:bg-brand/50 active:scale-95 transition duration-150 flex justify-center items-center rounded-full ${animate ? "text-white" : "text-text_normal"}`}
                                aria-label="Search"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m21 21-4.34-4.34" />
                                    <circle cx="11" cy="11" r="8" />
                                </svg>
                            </button>

                            <button
                                onClick={() => setIsCartOpen(true)}
                                className={`relative w-10 h-10 hover:bg-brand/50 active:scale-95 transition duration-150 flex justify-center items-center rounded-full ${animate ? "text-white" : "text-text_normal"}`}
                                aria-label="Cart"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="8" cy="21" r="1" />
                                    <circle cx="19" cy="21" r="1" />
                                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                                </svg>
                                {totalQty > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {totalQty}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ── DESKTOP LAYOUT (lg+): logo | center links | icons ── */}
                    <div className="hidden lg:flex w-full items-center justify-between">
                        {/* Logo */}
                        <h1 className={`text-3xl font-bold font-proza-libre select-none ${animate ? "text-white" : "text-text_normal"}`}>Al Idaad</h1>

                        {/* Center nav links */}
                        <div className="flex gap-4 items-center">
                            {links.map(({ href, label }) => {
                                const isActive = pathname === href;
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`relative py-1.5 pb-1 transition-colors duration-200 group font-bold text-sm
                ${
                    animate
                        ? isActive
                            ? "text-yellow-400" // active link color on dark bg
                            : "text-white hover:text-gray-300" // inactive link color on dark bg
                        : isActive
                          ? "text-brand"
                          : "text-text_normal"
                }`}
                                    >
                                        {label}
                                        <span
                                            className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-out
                  ${
                      animate
                          ? isActive
                              ? "w-full bg-yellow-400"
                              : "w-0 group-hover:w-full bg-white/70"
                          : isActive
                            ? "w-full bg-brand"
                            : "w-0 group-hover:w-full bg-brand"
                  }`}
                                        />
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right icons */}
                        <div className="flex items-center gap-1">
                            <button
                                className={`relative w-10 h-10 hover:bg-white/20 active:scale-95 transition duration-150 flex justify-center items-center rounded-full
            ${animate ? "text-white" : "text-text_normal"}`}
                                aria-label="Search"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m21 21-4.34-4.34" />
                                    <circle cx="11" cy="11" r="8" />
                                </svg>
                            </button>
                            <button
                                className={`relative w-10 h-10 hover:bg-white/20 active:scale-95 transition duration-150 flex justify-center items-center rounded-full
            ${animate ? "text-white" : "text-text_normal"}`}
                                onClick={() => setIsCartOpen(true)}
                                aria-label="Cart"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="8" cy="21" r="1" />
                                    <circle cx="19" cy="21" r="1" />
                                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                                </svg>
                                {totalQty > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {totalQty}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── Shared Overlay ── */}
            <div
                onClick={() => {
                    setIsMenuOpen(false);
                    setIsCartOpen(false);
                }}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
                    ${isMenuOpen || isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            {/* ── Mobile Menu Drawer ── */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden
                ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <span className="font-bold text-lg text-text_normal tracking-tight">Menu</span>
                    <button
                        onClick={() => setIsMenuOpen(false)}
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
                <nav className="flex flex-col px-4 py-4 gap-1">
                    {links.map(({ href, label }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`relative px-3 py-3 rounded-lg font-bold transition-colors duration-200 group overflow-hidden
                                    ${isActive ? "text-brand bg-blue-50" : "text-text_normal hover:bg-gray-50"}`}
                            >
                                {label}
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 bg-brand transition-all duration-300 ease-out
                                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                                />
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* ── Cart Drawer ── */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out
                ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <span className="font-bold text-lg text-text_normal tracking-tight">Cart</span>
                    <button
                        onClick={() => setIsCartOpen(false)}
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
                <div className="p-4 h-[calc(100%-73px)] overflow-y-auto custom-scrollbar">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                            <p className="text-sm font-medium">No products added</p>
                        </div>
                    ) : (
                        <>
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex gap-3 mb-4 border-b border-border pb-3">
                                    <Image src={item.url} width={64} height={80} alt={item.title} className="w-16 h-20 object-cover rounded" />
                                    <div className="flex flex-col justify-between flex-1">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-sm font-semibold">{item.title}</p>
                                                <p className="text-xs text-gray-500">{item.category}</p>
                                            </div>
                                            <button onClick={() => removeItem(index)} className="text-xs text-red-500 hover:underline">
                                                Remove
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-red-500 font-semibold text-sm">{item.price}</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => decreaseQty(index)}
                                                    className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-sm"
                                                >
                                                    −
                                                </button>
                                                <span className="text-sm font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => increaseQty(index)}
                                                    className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-sm"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="border-t border-border pt-3 mt-4">
                                <p className="flex justify-between font-semibold">
                                    <span>Total:</span>
                                    <span>
                                        ৳{" "}
                                        {cartItems
                                            .reduce((total, item) => {
                                                const numericPrice = Number(item.price.replace(/[^\d]/g, ""));
                                                return total + numericPrice * item.quantity;
                                            }, 0)
                                            .toLocaleString()}
                                    </span>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
