import Banner from "@/components/ui/banner/Banner";
import BestSoldProduct from "@/components/ui/best-selling/BestSoldProduct";
import Blog from "@/components/ui/blog/Blog";
import FeaturedProduct from "@/components/ui/featured/FeaturedProduct";
import Offer from "@/components/ui/offer/Offer";
import OurProduct from "@/components/ui/our-product/OurProduct";

const Homepage = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="space-y-20 py-20 max-w-7xl mx-auto">
                <FeaturedProduct></FeaturedProduct>
                <Offer></Offer>
                <BestSoldProduct></BestSoldProduct>
                <OurProduct></OurProduct>
                <Blog></Blog>
            </div>
        </div>
    );
};

export default Homepage;
