"use client";

import { useCart } from "@/components/shared/CartContext";
import { ProductType } from "@/utils/types";
import toast from "react-hot-toast";

const ButtonContainer = ({ product }: { product: ProductType }) => {
    const { addItem, isInCart } = useCart();

    const handleAddToCart = () => {
        addItem(product);
        toast.success("Added to cart 🛒");
    };

    const alreadyInCart = isInCart(product._id);

    return (
        <div className="flex justify-between w-full">
            <button
                onClick={handleAddToCart}
                title={alreadyInCart ? "Add one more" : "Add to cart"}
                className={`relative transition duration-150 active:scale-90
                    ${alreadyInCart ? "text-brand" : "text-text_dark hover:text-text_light"}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={alreadyInCart ? "currentColor" : "none"}
                    stroke="currentColor"
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
    );
};

export default ButtonContainer;
