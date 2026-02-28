import ProductCard from "./ProductCard";

const OurProduct = () => {
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
            url: "https://i.postimg.cc/s2ff0cxd/product-2.jpg",
            title: "Premium Saudi Thobe  White",
            price: "৳ 5,800",
            category: "Thobe",
        },
        {
            _id: "3",
            url: "https://i.postimg.cc/3wrrbBRg/product-3.webp",
            title: "Elegant Black Thobe",
            price: "৳ 6,200",
            category: "Thobe",
        },
        {
            _id: "4",
            url: "https://i.postimg.cc/90crChFW/product-4.webp",
            title: "Royal Oud Attar  Premium",
            price: "৳ 1,200",
            category: "Attar",
        },
        {
            _id: "5",
            url: "https://i.postimg.cc/3N3dYTJ7/product-5.webp",
            title: "Amber Musk Attar",
            price: "৳ 950",
            category: "Attar",
        },
        {
            _id: "6",
            url: "https://i.postimg.cc/50B6h0Jn/product-6.jpg",
            title: "Rose Essence Attar",
            price: "৳ 850",
            category: "Attar",
        },
        {
            _id: "7",
            url: "https://i.postimg.cc/3wrrbBRg/product-3.webp",
            title: "Elegant Black Thobe  Slim Fit",
            price: "৳ 6,400", // slightly higher → different variant
            category: "Thobe",
        },
        {
            _id: "8",
            url: "https://i.postimg.cc/3N3dYTJ7/product-5.webp",
            title: "Amber Musk Attar  50ml",
            price: "৳ 1,050",
            category: "Attar",
        },
    ];
    return (
        <div>
            <p className="text-3xl font-poppins text-center font-semibold mb-8">Our Product</p>

            <div className="flex flex-wrap justify-between gap-4">
                {data.map((e, i) => (
                    <div key={i}>
                        <ProductCard data={e}></ProductCard>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurProduct;
