"use client";

import { ProductType } from "@/utils/types";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CartItem = ProductType & {
    quantity: number;
    selectedVariant?: string;
};

interface CartContextValue {
    items: CartItem[];
    totalQty: number;
    totalPrice: number;
    addItem: (product: ProductType) => void;
    removeItem: (productId: string) => void;
    increaseQty: (productId: string) => void;
    decreaseQty: (productId: string) => void;
    clearCart: () => void;
    isInCart: (productId: string) => boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "al_idaad_cart";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const loadCartFromStorage = (): CartItem[] => {
    // This runs only on the client (Next.js calls useState initializer lazily)
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? (JSON.parse(stored) as CartItem[]) : [];
    } catch {
        localStorage.removeItem(CART_KEY);
        return [];
    }
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    // ✅ Lazy initializer — runs once, no effect needed, no cascading render
    const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);

    // Sync to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    }, [items]);

    // ── Derived values ────────────────────────────────────────────────────────

    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = items.reduce((sum, item) => {
        return sum + (item.price ?? 0) * item.quantity;
    }, 0);

    // ── Actions ───────────────────────────────────────────────────────────────

    const addItem = useCallback((product: ProductType) => {
        setItems((prev) => {
            const existingIndex = prev.findIndex((i) => i._id === product._id);
            if (existingIndex !== -1) {
                return prev.map((item, idx) => (idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item));
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems((prev) => prev.filter((item) => item._id !== productId));
    }, []);

    const increaseQty = useCallback((productId: string) => {
        setItems((prev) => prev.map((item) => (item._id === productId ? { ...item, quantity: item.quantity + 1 } : item)));
    }, []);

    const decreaseQty = useCallback((productId: string) => {
        setItems((prev) =>
            prev.map((item) => (item._id === productId ? { ...item, quantity: item.quantity - 1 } : item)).filter((item) => item.quantity > 0),
        );
    }, []);

    const clearCart = useCallback(() => setItems([]), []);

    const isInCart = useCallback((productId: string) => items.some((item) => item._id === productId), [items]);

    return (
        <CartContext.Provider value={{ items, totalQty, totalPrice, addItem, removeItem, increaseQty, decreaseQty, clearCart, isInCart }}>
            {children}
        </CartContext.Provider>
    );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useCart = (): CartContextValue => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
};
