import Banner from "@/components/ui/banner/Banner";
import FeaturedProduct from "@/components/ui/featured/FeaturedProduct";

const Homepage = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="space-y-12 py-12">
                <FeaturedProduct></FeaturedProduct>
            </div>
        </div>
    );
};

export default Homepage;
