"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// import "./style.css";

// import required modules
import { EffectFade, Autoplay } from "swiper/modules";
import Image from "next/image";
import { BannerType } from "@/utils/types";

const BannerSlider = ({ data }: { data: BannerType[] }) => {
    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                effect={"fade"}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                // pagination={{
                //     clickable: true,
                // }}
                modules={[EffectFade, Autoplay]}
                className="mySwiper"
            >
                {data.map((ele) => (
                    <SwiperSlide key={ele._id}>
                        {/* Image */}
                        <div className="flex justify-center">
                            <Image src={ele.url} alt="al idaad banner" width={1920} height={1068} className="w-screen h-150" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
export default BannerSlider;
