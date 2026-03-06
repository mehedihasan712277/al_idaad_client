import { getCategories, getProducts } from "@/utils/fetchData";
import AllProductsClient from "./AllProductsClient";

const AllProducts = async () => {
    const productData = await getProducts();
    const productCategories = await getCategories();

    return <AllProductsClient products={productData} categories={productCategories} />;
};

export default AllProducts;
