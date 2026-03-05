"use client";

// ─── No useEffect for resetting state! ───────────────────────────────────────
// The parent mounts this component fresh each time the modal opens by passing
// key={modalOpen ? product._id : ""} — React remounts on key change,
// so all useState values are naturally reset to their initials. Zero effects needed.

import { useState } from "react";
import { ProductType, ProductVariant, AttarSize } from "@/utils/types";
import toast from "react-hot-toast";
import { useCart } from "@/components/shared/CartContext";
import { buildCartKey } from "@/utils/helper";

interface Props {
    product: ProductType;
    isOpen: boolean;
    onClose: () => void;
}

const formatVariantLabel = (v: ProductVariant): string => {
    const parts: string[] = [`Size: ${v.size}`];
    if (v.color) parts.push(`Color: ${v.color}`);
    if (v.chest) parts.push(`Chest: ${v.chest}"`);
    if (v.length) parts.push(`Length: ${v.length}"`);
    return parts.join(" · ");
};

const VariantSelectorModal = ({ product, isOpen, onClose }: Props) => {
    const { addItem, isInCart } = useCart();

    const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
    const hasAttarSizes = Array.isArray(product.attarSizes) && product.attarSizes.length > 0;

    // ✅ Plain useState — reset is handled by the parent re-keying this component
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [selectedAttar, setSelectedAttar] = useState<AttarSize | null>(null);

    const resolvedPrice = (() => {
        if (hasVariants && selectedVariant?.price != null) return selectedVariant.price;
        if (hasAttarSizes && selectedAttar) return selectedAttar.price;
        return product.price;
    })();

    const cartKey = buildCartKey(product, selectedVariant ?? undefined, selectedAttar ?? undefined);
    const alreadyInCart = isInCart(cartKey);

    const canAdd = hasVariants ? selectedVariant !== null : hasAttarSizes ? selectedAttar !== null : true;

    const handleAdd = () => {
        if (!canAdd) {
            toast.error(hasVariants ? "Please select a size" : "Please select an amount");
            return;
        }
        addItem({
            product,
            selectedVariant: selectedVariant ?? undefined,
            selectedAttarSize: selectedAttar ?? undefined,
            resolvedPrice,
        });
        toast.success("Added to cart 🛒");
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300
                    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            {/* Bottom sheet */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl
                    transform transition-transform duration-300 ease-out
                    ${isOpen ? "translate-y-0" : "translate-y-full"}`}
            >
                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 bg-gray-200 rounded-full" />
                </div>

                <div className="px-5 pb-8 max-h-[85vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-start justify-between pt-3 pb-4 border-b border-gray-100">
                        <div className="flex-1 min-w-0 pr-4">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                {hasVariants ? "Select Size & Color" : hasAttarSizes ? "Select Amount" : "Add to Cart"}
                            </p>
                            <h3 className="font-bold text-text_normal text-base leading-snug">{product.name}</h3>
                            <p className="text-xs text-gray-400 mt-0.5">{product.category.name}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 hover:bg-gray-200 transition"
                            aria-label="Close"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* ── THOBE VARIANTS ─────────────────────────────────────── */}
                    {hasVariants && (
                        <div className="pt-5">
                            <p className="text-xs font-semibold text-gray-500 mb-3">Available Sizes</p>
                            <div className="space-y-2">
                                {product.variants!.map((v, i) => {
                                    const isSelected = selectedVariant?.size === v.size && selectedVariant?.color === v.color;
                                    const inCartAlready = isInCart(buildCartKey(product, v));

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedVariant(isSelected ? null : v)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all duration-150 text-left
                                                ${isSelected ? "border-brand bg-brand/5" : "border-gray-100 hover:border-gray-300 bg-gray-50"}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition
                                                    ${isSelected ? "border-brand" : "border-gray-300"}`}
                                                >
                                                    {isSelected && <div className="w-2 h-2 rounded-full bg-brand" />}
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-semibold ${isSelected ? "text-brand" : "text-text_normal"}`}>
                                                        {formatVariantLabel(v)}
                                                    </p>
                                                    {inCartAlready && (
                                                        <p className="text-[10px] text-green-600 font-medium mt-0.5">Already in cart</p>
                                                    )}
                                                </div>
                                            </div>
                                            {v.price != null ? (
                                                <span className={`text-sm font-bold ${isSelected ? "text-brand" : "text-text_normal"}`}>
                                                    ৳ {v.price.toLocaleString()}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">Base price</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ── ATTAR SIZES ────────────────────────────────────────── */}
                    {hasAttarSizes && (
                        <div className="pt-5">
                            <p className="text-xs font-semibold text-gray-500 mb-3">Available Sizes</p>
                            <div className="grid grid-cols-2 gap-2">
                                {product.attarSizes!.map((a, i) => {
                                    const isSelected = selectedAttar?.ml === a.ml;
                                    const inCartAlready = isInCart(buildCartKey(product, undefined, a));

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedAttar(isSelected ? null : a)}
                                            className={`relative flex flex-col items-center justify-center py-4 px-3 rounded-xl border-2 transition-all duration-150
                                                ${isSelected ? "border-brand bg-brand/5" : "border-gray-100 hover:border-gray-300 bg-gray-50"}`}
                                        >
                                            <svg
                                                className={`w-6 h-6 mb-2 ${isSelected ? "text-brand" : "text-gray-400"}`}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M9 3h6l1 4H8z" />
                                                <rect x="6" y="7" width="12" height="14" rx="3" />
                                                <path d="M12 11v4M10 13h4" />
                                            </svg>
                                            <p className={`text-sm font-bold ${isSelected ? "text-brand" : "text-text_normal"}`}>{a.ml} ml</p>
                                            <p className={`text-sm font-semibold mt-0.5 ${isSelected ? "text-brand" : "text-gray-600"}`}>
                                                ৳ {a.price.toLocaleString()}
                                            </p>
                                            {inCartAlready && (
                                                <span className="absolute top-1.5 right-1.5 text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">
                                                    In cart
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ── Price + Add button ─────────────────────────────────── */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">
                                {hasVariants && !selectedVariant && "Select a size to see price"}
                                {hasAttarSizes && !selectedAttar && "Select an amount to see price"}
                                {((!hasVariants && !hasAttarSizes) || selectedVariant || selectedAttar) && "Unit price"}
                            </p>
                            <p className="text-xl font-bold text-brand">৳ {resolvedPrice.toLocaleString()}</p>
                        </div>

                        <button
                            onClick={handleAdd}
                            disabled={!canAdd}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition duration-150 active:scale-95
                                ${
                                    canAdd
                                        ? alreadyInCart
                                            ? "bg-green-500 text-white hover:bg-green-600"
                                            : "bg-brand text-white hover:opacity-90"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="8" cy="21" r="1" />
                                <circle cx="19" cy="21" r="1" />
                                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                            </svg>
                            {alreadyInCart ? "Add Again" : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VariantSelectorModal;
