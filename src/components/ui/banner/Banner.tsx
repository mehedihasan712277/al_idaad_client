// src/components/ui/banner/Banner.tsx
import { getBanners } from "@/utils/fetchData";
import BannerSlider from "./BannerSlider";
import Image from "next/image";

const Banner = async () => {
    const banners = await getBanners();

    if (!banners || banners.length === 0) return null;

    return (
        <div className="relative w-full aspect-5/2 lg:aspect-3/1">
            {/* Server-rendered static hero image */}
            <div className="absolute inset-0 z-10">
                <Image src={banners[0].url} alt="al idaad shop" fill priority sizes="100vw" className="object-cover" />
            </div>

            {/* Server-rendered slider component */}
            <div className="absolute inset-0 z-20">
                <BannerSlider data={banners} />
            </div>
        </div>
    );
};

export default Banner;
