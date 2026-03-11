import AllProducts from "@/components/ui/our-product/AllProducts";

type Props = {
    searchParams: Promise<{
        category?: string;
    }>;
};

const AllProductPage = async ({ searchParams }: Props) => {
    const { category } = await searchParams;

    return (
        <div className="pb-20 max-w-7xl px-4 mx-auto">
            <AllProducts activeCategory={category || ""}></AllProducts>
        </div>
    );
};

export default AllProductPage;
