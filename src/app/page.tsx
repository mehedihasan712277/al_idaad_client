import Banner from "@/components/ui/banner/Banner";
import FeaturedProduct from "@/components/ui/featured/FeaturedProduct";
import Offer from "@/components/ui/offer/Offer";

const Homepage = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="space-y-20 py-20 max-w-7xl mx-auto">
                <FeaturedProduct></FeaturedProduct>
                <Offer></Offer>
            </div>
        </div>
    );
};

export default Homepage;
