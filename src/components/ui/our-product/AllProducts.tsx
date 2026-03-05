import { getProducts } from "@/utils/fetchData";
import ProductCard from "./ProductCard";

const AllProducts = async () => {
    const productData = await getProducts();
    return (
        <div>
            <div className="flex flex-wrap gap-4">
                {productData.map((e) => (
                    <div key={e._id}>
                        <ProductCard data={e}></ProductCard>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
