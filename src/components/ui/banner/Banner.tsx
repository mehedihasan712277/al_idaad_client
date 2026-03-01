import { getBanners } from "@/utils/fetchData";
import BannerSlider from "./BannerSlider";

const Banner = async () => {
    const bannerData = await getBanners();
    return (
        <div>
            <BannerSlider data={bannerData}></BannerSlider>
        </div>
    );
};

export default Banner;
