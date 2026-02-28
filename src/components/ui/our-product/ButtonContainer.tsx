"use client";

type Product = {
    url: string;
    title: string;
    price: string;
    category: string;
};

const ButtonContainer = ({ product }: { product: Product }) => {
    const addToCart = () => {
        const existingCart = localStorage.getItem("cart");
        const cart = existingCart ? JSON.parse(existingCart) : [];

        // check if product already exists
        const existingProductIndex = cart.findIndex((item: Product & { quantity: number }) => item.url === product.url);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Product added to cart 🛒");
    };

    return (
        <div className="flex justify-between w-full">
            <button onClick={addToCart} className="text-text_dark hover:text-text_light transition duration-150 active:scale-90">
                {/* Cart Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
            </button>

            <button className="text-text_dark hover:text-text_light transition duration-150 active:scale-90">
                {/* Arrow Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default ButtonContainer;
