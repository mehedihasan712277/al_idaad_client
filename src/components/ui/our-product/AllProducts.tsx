import ProductCard from "./ProductCard";

const AllProducts = () => {
    const data = [
        {
            _id: "1",
            url: "https://i.postimg.cc/jjqqkX5F/product-1.jpg",
            title: "Classic White Thobe",
            price: "৳ 4,500",
            category: "Thobe",
        },
        {
            _id: "2",
            url: "https://i.postimg.cc/50B6h0Jn/product-6.jpg",
            title: "Rose Essence Attar (30ml)",
            price: "৳ 850",
            category: "Attar",
        },
        {
            _id: "3",
            url: "https://i.postimg.cc/s2ff0cxd/product-2.jpg",
            title: "Premium Saudi Thobe – Navy",
            price: "৳ 5,800",
            category: "Thobe",
        },
        {
            _id: "4",
            url: "https://i.postimg.cc/3wrrbBRg/product-3.webp",
            title: "Elegant Black Thobe",
            price: "৳ 6,200",
            category: "Thobe",
        },
        {
            _id: "5",
            url: "https://i.postimg.cc/s2ff0cxd/product-2.jpg",
            title: "Premium Saudi Thobe – White",
            price: "৳ 5,800",
            category: "Thobe",
        },
        {
            _id: "6",
            url: "https://i.postimg.cc/50B6h0Jn/product-6.jpg",
            title: "Rose Essence Attar (50ml)",
            price: "৳ 1,250", // slightly adjusted price to match different size
            category: "Attar",
        },
        {
            _id: "7",
            url: "https://i.postimg.cc/90crChFW/product-4.webp",
            title: "Royal Oud Attar",
            price: "৳ 1,200",
            category: "Attar",
        },
        {
            _id: "8",
            url: "https://i.postimg.cc/3N3dYTJ7/product-5.webp",
            title: "Amber Musk Attar",
            price: "৳ 950",
            category: "Attar",
        },
        {
            _id: "9",
            url: "https://i.postimg.cc/50B6h0Jn/product-6.jpg",
            title: "Rose Essence Attar – Mini",
            price: "৳ 550",
            category: "Attar",
        },
        {
            _id: "10",
            url: "https://i.postimg.cc/s2ff0cxd/product-2.jpg",
            title: "Premium Saudi Thobe – Beige",
            price: "৳ 5,800",
            category: "Thobe",
        },
        {
            _id: "11",
            url: "https://i.postimg.cc/50B6h0Jn/product-6.jpg",
            title: "Rose Essence Attar (Travel Size)",
            price: "৳ 650",
            category: "Attar",
        },
        {
            _id: "12",
            url: "https://i.postimg.cc/90crChFW/product-4.webp",
            title: "Royal Oud Attar – Premium",
            price: "৳ 1,800",
            category: "Attar",
        },
        {
            _id: "13",
            url: "https://i.postimg.cc/3N3dYTJ7/product-5.webp",
            title: "Amber Musk Attar – Long Lasting",
            price: "৳ 1,100",
            category: "Attar",
        },
        {
            _id: "14",
            url: "https://i.postimg.cc/50B6h0Jn/product-6.jpg",
            title: "Rose Essence Attar (100ml)",
            price: "৳ 2,200",
            category: "Attar",
        },
        {
            _id: "15",
            url: "https://i.postimg.cc/s2ff0cxd/product-2.jpg",
            title: "Premium Saudi Thobe – Grey",
            price: "৳ 5,800",
            category: "Thobe",
        },
    ];
    return (
        <div>
            <div className="flex flex-wrap gap-4">
                {data.map((e, i) => (
                    <div key={i}>
                        <ProductCard data={e}></ProductCard>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
