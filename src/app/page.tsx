import Banner from "@/components/ui/banner/Banner";
import BestSoldProduct from "@/components/ui/best-selling/BestSoldProduct";
import Blog from "@/components/ui/blog/Blog";
import FeaturedProduct from "@/components/ui/featured/FeaturedProduct";
import Offer from "@/components/ui/offer/Offer";
import OurProduct from "@/components/ui/our-product/OurProduct";
// import Link from "next/link";

const Homepage = () => {
    return (
        <div>
            <div className="relative">
                <Banner></Banner>
                {/* <div className="absolute top-0 left-0 right-0 z-1 h-50 banner sm:h-75! md:h-90! lg:h-120! xl:h-150! flex justify-center items-center bg-black/80">
                    <div className="text-white text-center xl:space-y-3">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-proza-libre font-bold">Al Idaad</h1>
                        <p className="xl:text-2xl xl:tracking-widest text-gray-200">A symbol of trust, quality & elegance</p>

                        <div className="w-fit mx-auto mt-5 xl:mt-8">
                            <Link
                                href="/all-products"
                                className="px-4 py-2 rounded-full border-border border cursor-pointer hover:bg-white hover:text-text_dark transition duration-150 text-xs md:text-[16px]"
                            >
                                See Products
                            </Link>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="space-y-20 py-20 px-4 max-w-7xl mx-auto">
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
