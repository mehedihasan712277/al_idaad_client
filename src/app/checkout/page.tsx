"use client";

import { useCart } from "@/components/shared/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
    fullName: string;
    phone: string;
    altPhone: string;
    address: string;
    city: string;
    district: string;
    note: string;
}

const INITIAL_FORM: FormData = {
    fullName: "",
    phone: "",
    altPhone: "",
    address: "",
    city: "",
    district: "",
    note: "",
};

// ─── Success Screen ───────────────────────────────────────────────────────────

const OrderSuccess = ({ orderId }: { orderId: string }) => (
    <div className="min-h-screen bg-bg_main flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <svg
                    className="w-12 h-12 text-green-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-text_normal mb-2">Order Placed!</h1>
            <p className="text-gray-500 text-sm mb-1">Your order ID is</p>
            <p className="font-mono font-bold text-brand text-lg mb-4">{orderId}</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
                <div className="flex gap-3">
                    <svg
                        className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <div>
                        <p className="text-sm font-semibold text-amber-800 mb-0.5">Cash on Delivery</p>
                        <p className="text-xs text-amber-700 leading-relaxed">
                            Please have the exact amount ready when our delivery agent arrives. We will contact you on your provided number to confirm
                            delivery.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/all-products"
                    className="flex-1 bg-brand text-white text-center py-3 rounded-xl font-semibold hover:opacity-90 active:scale-95 transition duration-150 text-sm"
                >
                    Continue Shopping
                </Link>
                <Link
                    href="/"
                    className="flex-1 border border-border text-text_normal text-center py-3 rounded-xl font-semibold hover:bg-gray-50 active:scale-95 transition duration-150 text-sm"
                >
                    Go Home
                </Link>
            </div>
        </div>
    </div>
);

// ─── Checkout Page ────────────────────────────────────────────────────────────

const CheckoutPage = () => {
    const { items, totalPrice, totalQty, clearCart } = useCart();
    const [form, setForm] = useState<FormData>(INITIAL_FORM);
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    if (items.length === 0 && !orderId) {
        return (
            <div className="min-h-screen bg-bg_main flex items-center justify-center px-4">
                <div className="text-center">
                    <svg
                        className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
                    <h2 className="text-xl font-bold text-text_normal mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 text-sm mb-6">Add some products before checking out.</p>
                    <Link
                        href="/all-products"
                        className="bg-brand text-white px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition text-sm"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    if (orderId) return <OrderSuccess orderId={orderId} />;

    const deliveryCharge = form.city.toLowerCase().includes("dhaka") ? 60 : 120;
    const grandTotal = totalPrice + deliveryCharge;

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};
        if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!form.phone.trim()) newErrors.phone = "Phone number is required";
        else if (!/^(?:\+8801|01)[3-9]\d{8}$/.test(form.phone.replace(/\s/g, ""))) newErrors.phone = "Enter a valid Bangladeshi number";
        if (!form.address.trim()) newErrors.address = "Address is required";
        if (!form.city.trim()) newErrors.city = "City is required";
        if (!form.district.trim()) newErrors.district = "District is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async () => {
        if (!validate()) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);
        try {
            // ── Build order items — include variant/attar details if present ──
            const orderItems = items.map((item) => {
                const base = {
                    productId: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    thumbnail: item.thumbnail,
                };
                // Attach variant info if this line item has one
                if (item.selectedVariant) {
                    return { ...base, variant: item.selectedVariant };
                }
                if (item.selectedAttarSize) {
                    return { ...base, attarSize: item.selectedAttarSize };
                }
                return base;
            });

            const orderPayload = {
                // Delivery details — flat fields (most APIs expect this, not nested)
                fullName: form.fullName,
                phone: form.phone,
                altPhone: form.altPhone || undefined,
                address: form.address,
                city: form.city,
                district: form.district,
                note: form.note || undefined,

                // Order details
                items: orderItems,
                subtotal: totalPrice,
                deliveryCharge,
                grandTotal,
                paymentMethod: "cash_on_delivery",
            };

            // console.log("📦 Order payload:", JSON.stringify(orderPayload, null, 2));

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload),
            });

            // ✅ Always read the body — even on error — so we know exactly what failed
            const data = await res.json();
            // console.log("🔁 Server response:", data);

            if (!res.ok) {
                // Show the server's own error message if it sent one
                const serverMessage =
                    data?.message ||
                    data?.error ||
                    (Array.isArray(data?.errors)
                        ? data.errors.map((e: { msg?: string; message?: string }) => e.msg ?? e.message).join(", ")
                        : null) ||
                    "Order failed. Please try again.";
                toast.error(serverMessage);
                return;
            }

            const newOrderId = data?.data?._id ?? data?._id ?? `ORD-${Date.now()}`;
            clearCart();
            setOrderId(newOrderId);
        } catch {
            // console.error("💥 Unexpected error:", error);
            toast.error("Something went wrong. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-bg_main pt-24 md:pt-32 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/all-products"
                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-text_normal transition mb-4"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Continue Shopping
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-text_normal">Checkout</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {totalQty} item{totalQty > 1 ? "s" : ""} in your cart
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                    {/* ── LEFT ── */}
                    <div className="space-y-5">
                        <section className="bg-white rounded-2xl border border-border p-6">
                            <h2 className="font-bold text-text_normal mb-5 flex items-center gap-2">
                                <span className="w-6 h-6 bg-brand text-white rounded-full text-xs flex items-center justify-center font-bold">1</span>
                                Delivery Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        placeholder="e.g. Abdullah Al Mamun"
                                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-text_normal placeholder:text-gray-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${errors.fullName ? "border-red-400 bg-red-50" : "border-border bg-gray-50"}`}
                                    />
                                    {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="01XXXXXXXXX"
                                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-text_normal placeholder:text-gray-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${errors.phone ? "border-red-400 bg-red-50" : "border-border bg-gray-50"}`}
                                    />
                                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        Alternative Phone <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="altPhone"
                                        value={form.altPhone}
                                        onChange={handleChange}
                                        placeholder="01XXXXXXXXX"
                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-gray-50 text-sm text-text_normal placeholder:text-gray-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        Full Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="House no, road, area"
                                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-text_normal placeholder:text-gray-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${errors.address ? "border-red-400 bg-red-50" : "border-border bg-gray-50"}`}
                                    />
                                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        City / Thana <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="e.g. Dhaka, Mirpur"
                                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-text_normal placeholder:text-gray-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${errors.city ? "border-red-400 bg-red-50" : "border-border bg-gray-50"}`}
                                    />
                                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        District <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={form.district}
                                        onChange={handleChange}
                                        placeholder="e.g. Dhaka, Chattogram"
                                        className={`w-full px-4 py-2.5 rounded-xl border text-sm text-text_normal placeholder:text-gray-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${errors.district ? "border-red-400 bg-red-50" : "border-border bg-gray-50"}`}
                                    />
                                    {errors.district && <p className="text-xs text-red-500 mt-1">{errors.district}</p>}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                        Order Note <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    <textarea
                                        name="note"
                                        value={form.note}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="Any special instructions for delivery..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-gray-50 text-sm text-text_normal placeholder:text-gray-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-2xl border border-border p-6">
                            <h2 className="font-bold text-text_normal mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 bg-brand text-white rounded-full text-xs flex items-center justify-center font-bold">2</span>
                                Payment Method
                            </h2>
                            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                                <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-green-800">Cash on Delivery</p>
                                    <p className="text-xs text-green-700">Pay when your order arrives at your door</p>
                                </div>
                                <svg
                                    className="w-8 h-8 text-green-600 ml-auto shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="2" y="6" width="20" height="12" rx="2" />
                                    <path d="M22 10H2M7 15h.01M11 15h2" />
                                </svg>
                            </div>
                        </section>
                    </div>

                    {/* ── RIGHT ── */}
                    <div>
                        <section className="bg-white rounded-2xl border border-border p-5 sticky top-32">
                            <h2 className="font-bold text-text_normal mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 bg-brand text-white rounded-full text-xs flex items-center justify-center font-bold">3</span>
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                                {items.map((item) => {
                                    // Show variant/attar label if present
                                    const subtitle = item.selectedVariant
                                        ? [item.selectedVariant.size, item.selectedVariant.color].filter(Boolean).join(" · ")
                                        : item.selectedAttarSize
                                          ? `${item.selectedAttarSize.ml} ml`
                                          : null;

                                    return (
                                        <div key={item.cartKey} className="flex gap-3">
                                            <div className="relative w-14 shrink-0">
                                                <Image
                                                    src={item.thumbnail}
                                                    alt={item.name}
                                                    width={56}
                                                    height={72}
                                                    className="w-14 h-18 object-cover rounded-lg"
                                                />
                                                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-text_normal leading-tight truncate">{item.name}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{item.category.name}</p>
                                                {subtitle && (
                                                    <span className="inline-block mt-0.5 text-[10px] font-semibold bg-brand/10 text-brand px-2 py-0.5 rounded-full">
                                                        {subtitle}
                                                    </span>
                                                )}
                                                <p className="text-sm font-bold text-brand mt-1">৳ {(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t border-border pt-4 space-y-2.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-semibold text-text_normal">৳ {totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-1">
                                        Delivery Charge
                                        {form.city && (
                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                                                {form.city.toLowerCase().includes("dhaka") ? "Inside Dhaka" : "Outside Dhaka"}
                                            </span>
                                        )}
                                    </span>
                                    <span className="font-semibold text-text_normal">৳ {deliveryCharge}</span>
                                </div>
                                <div className="flex justify-between text-base font-bold border-t border-border pt-2.5">
                                    <span className="text-text_normal">Total</span>
                                    <span className="text-brand">৳ {grandTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="mt-5 w-full bg-brand text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Placing Order...
                                    </>
                                ) : (
                                    <>
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
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Place Order
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-gray-400 mt-3">
                                By placing your order you agree to our{" "}
                                <Link href="/terms" className="text-brand hover:underline">
                                    Terms & Conditions
                                </Link>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CheckoutPage;
