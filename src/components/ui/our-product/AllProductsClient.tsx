"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { CategoryType, ProductType, SubCategoryType } from "@/utils/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AllProductsClientProps {
    products: ProductType[];
    categories: CategoryType[];
}

type AnyCategory = CategoryType | SubCategoryType;
type SortOption = "default" | "price-asc" | "price-desc";

// ─── Pure Helpers ─────────────────────────────────────────────────────────────

const collectAllIds = (node: AnyCategory): string[] => {
    const ids: string[] = [node._id];
    for (const child of node.subCategories) {
        ids.push(...collectAllIds(child));
    }
    return ids;
};

const findNode = (cats: AnyCategory[], id: string): AnyCategory | undefined => {
    for (const cat of cats) {
        if (cat._id === id) return cat;
        const found = findNode(cat.subCategories, id);
        if (found) return found;
    }
    return undefined;
};

// ─── AnimatedCollapse ─────────────────────────────────────────────────────────
// Uses max-height CSS transition — no useEffect, no JS measurement.
// React's "derived state during render" pattern handles mount/unmount:
// setting state during render (not in an effect) is explicitly supported
// for adjusting state based on prop changes.

const AnimatedCollapse = ({ open, children }: { open: boolean; children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(open);

    // Derived state during render — mounts immediately when open becomes true.
    // React re-renders synchronously with the updated state; no effect needed.
    if (open && !mounted) setMounted(true);

    const handleTransitionEnd = () => {
        // Unmount only after the closing transition fully completes
        if (!open) setMounted(false);
    };

    if (!mounted) return null;

    return (
        <div
            style={{
                // Large-enough ceiling; actual content is far shorter in any tree
                maxHeight: open ? "600px" : "0px",
                overflow: "hidden",
                transition: "max-height 260ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onTransitionEnd={handleTransitionEnd}
        >
            {children}
        </div>
    );
};

// ─── CategoryNode ─────────────────────────────────────────────────────────────

interface CategoryNodeProps {
    node: AnyCategory;
    depth: number;
    selectedId: string;
    onSelect: (id: string) => void;
}

const CategoryNode = ({ node, depth, selectedId, onSelect }: CategoryNodeProps) => {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = node.subCategories.length > 0;
    const isSelected = selectedId === node._id;

    return (
        <li>
            <div className="flex items-center gap-1" style={{ paddingLeft: `${depth * 14}px` }}>
                {/* Chevron */}
                <button
                    onClick={() => hasChildren && setExpanded((p) => !p)}
                    aria-label={expanded ? "Collapse" : "Expand"}
                    className={`w-5 h-5 flex items-center justify-center rounded shrink-0 transition-colors
                        ${hasChildren ? "text-text_normal hover:text-brand cursor-pointer" : "invisible pointer-events-none"}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform 260ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>

                {/* Label */}
                <button
                    onClick={() => onSelect(node._id)}
                    className={`flex-1 text-left py-1.5 px-2 rounded-lg text-sm font-medium transition-all duration-150
                        ${isSelected ? "bg-brand text-white" : "text-text_normal hover:bg-brand/10 hover:text-brand"}`}
                >
                    {node.name}
                </button>
            </div>

            {hasChildren && (
                <AnimatedCollapse open={expanded}>
                    <ul className="mt-0.5 space-y-0.5 pt-0.5">
                        {node.subCategories.map((child) => (
                            <CategoryNode key={child._id} node={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
                        ))}
                    </ul>
                </AnimatedCollapse>
            )}
        </li>
    );
};

// ─── Sidebar Content ──────────────────────────────────────────────────────────

interface SidebarContentProps {
    categories: CategoryType[];
    selectedId: string;
    onSelect: (id: string) => void;
    filteredCount: number;
    totalCount: number;
}

const SidebarContent = ({ categories, selectedId, onSelect, filteredCount, totalCount }: SidebarContentProps) => (
    <div className="flex flex-col h-full">
        <div className="pr-4 pt-5 pb-3 border-b border-border">
            <h2 className="font-proza-libre text-lg font-bold text-text_dark tracking-tight">Categories</h2>
            <p className="text-xs text-text_light mt-0.5">
                Showing {filteredCount} of {totalCount} products
            </p>
        </div>

        <nav className="flex-1 overflow-y-auto pr-3 py-3 custom-scrollbar">
            <ul className="space-y-0.5">
                <li>
                    <button
                        onClick={() => onSelect("all")}
                        className={`w-full text-left py-1.5 px-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-2
                            ${selectedId === "all" ? "bg-brand text-white" : "text-text_normal hover:bg-brand/10 hover:text-brand"}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                        </svg>
                        All Products
                    </button>
                </li>

                <li aria-hidden className="my-2 border-t border-border" />

                {categories.map((cat) => (
                    <CategoryNode key={cat._id} node={cat} depth={0} selectedId={selectedId} onSelect={onSelect} />
                ))}
            </ul>
        </nav>
    </div>
);

// ─── Sort Select ──────────────────────────────────────────────────────────────

interface SortSelectProps {
    value: SortOption;
    onChange: (v: SortOption) => void;
}

const SortSelect = ({ value, onChange }: SortSelectProps) => (
    <div className="flex items-center gap-2">
        <span className="text-sm text-text_normal shrink-0 hidden sm:inline">Sort:</span>
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as SortOption)}
                className="appearance-none pl-3 pr-8 py-2 text-sm border border-border rounded-lg bg-bg_main text-text_normal
                    focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 cursor-pointer transition"
            >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text_light">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </span>
        </div>
    </div>
);

// ─── Main Client Component ────────────────────────────────────────────────────

const AllProductsClient = ({ products, categories }: AllProductsClientProps) => {
    const [selectedId, setSelectedId] = useState<string>("all");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [sortOption, setSortOption] = useState<SortOption>("default");

    const matchIds: Set<string> = (() => {
        if (selectedId === "all") return new Set<string>();
        const node = findNode(categories, selectedId);
        if (!node) return new Set<string>();
        return new Set(collectAllIds(node));
    })();

    const filtered = selectedId === "all" ? [...products] : products.filter((p) => p.categoryIdList.some((id) => matchIds.has(id)));

    const sortedProducts = [...filtered].sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        return 0;
    });

    const handleSelect = (id: string) => {
        setSelectedId(id);
        setDrawerOpen(false);
    };

    return (
        <div className="relative flex min-h-screen">
            {/* ── Desktop Sidebar ───────────────────────────────────── */}
            <aside className="hidden lg:flex flex-col lg:w-[calc(25vw-24px)] xl:w-75 shrink-0 sticky top-18 md:top-25 self-start h-[calc(100vh-100px)] md:h-[calc(100vh-100px)] bg-bg_main border-r border-border">
                <SidebarContent
                    categories={categories}
                    selectedId={selectedId}
                    onSelect={handleSelect}
                    filteredCount={sortedProducts.length}
                    totalCount={products.length}
                />
            </aside>

            {/* ── Mobile Overlay ────────────────────────────────────── */}
            <div
                onClick={() => setDrawerOpen(false)}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden
                    ${drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            {/* ── Mobile Drawer ─────────────────────────────────────── */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-bg_main z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden
                    ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b border-border">
                    <span className="font-bold text-lg text-text_dark font-proza-libre">Filter</span>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition"
                        aria-label="Close filter"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#415e72"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div className="h-[calc(100%-65px)]">
                    <SidebarContent
                        categories={categories}
                        selectedId={selectedId}
                        onSelect={handleSelect}
                        filteredCount={sortedProducts.length}
                        totalCount={products.length}
                    />
                </div>
            </div>

            {/* ── Products Area ─────────────────────────────────────── */}
            <main className="flex-1 pt-4 lg:pl-4 min-w-0">
                <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-text_normal">
                            <span className="font-bold text-text_dark">{sortedProducts.length}</span> products
                        </p>
                        {selectedId !== "all" && (
                            <button
                                onClick={() => setSelectedId("all")}
                                className="inline-flex items-center gap-1 text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-full font-semibold hover:bg-brand/20 transition"
                            >
                                Clear filter
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="9"
                                    height="9"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <SortSelect value={sortOption} onChange={setSortOption} />
                </div>

                {sortedProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3 text-text_light">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="52"
                            height="52"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        <p className="text-lg font-semibold text-text_normal">No products found</p>
                        <button onClick={() => setSelectedId("all")} className="text-sm text-brand underline hover:no-underline">
                            Clear filter
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-4">
                        {sortedProducts.map((p) => (
                            <ProductCard key={p._id} data={p} />
                        ))}
                    </div>
                )}
            </main>

            {/* ── Mobile Filter FAB ─────────────────────────────────── */}
            <button
                onClick={() => setDrawerOpen(true)}
                className="fixed bottom-6 left-4 z-30 lg:hidden flex items-center gap-2 bg-brand text-white pl-3 pr-4 py-3 rounded-full shadow-lg hover:opacity-90 active:scale-95 transition font-semibold text-sm"
                aria-label="Open filter"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="8" y1="12" x2="20" y2="12" />
                    <line x1="12" y1="18" x2="20" y2="18" />
                </svg>
                Filter
                {selectedId !== "all" && <span className="w-2 h-2 rounded-full bg-white opacity-90" />}
            </button>
        </div>
    );
};

export default AllProductsClient;
