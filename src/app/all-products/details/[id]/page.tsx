import ProductDetailsClient from "@/components/ui/our-product/ProductDetailsClient";
import { getSingleProduct } from "@/utils/fetchData";

const ProductDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const singleProductData = await getSingleProduct(id);

    // return <div className="py-20 max-w-7xl mx-auto"></div>;
    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <ProductDetailsClient product={singleProductData}></ProductDetailsClient>
        </div>
    );
};

export default ProductDetailsPage;
