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

const OfferSlider = () => {
    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                effect={"fade"}
                centeredSlides={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                loop={true}
                // pagination={{
                //     clickable: true,
                // }}
                modules={[EffectFade, Autoplay]}
                className="mySwiper"
            >
                {[
                    { img: "https://i.postimg.cc/4xsMcQJq/thobe-1.jpg" },
                    { img: "https://i.postimg.cc/K8xVTDZW/thobe-2.jpg" },
                    { img: "https://i.postimg.cc/wjgPNQ6n/thobe-3.jpg" },
                    { img: "https://i.postimg.cc/HkdKM9pK/thobe-4.jpg" },
                ].map((speaker, index) => (
                    <SwiperSlide key={index}>
                        {/* Image */}
                        <div className="flex justify-center">
                            <Image src={speaker.img} alt="al idaad offer product" width={1920} height={1068} className="w-screen h-80" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
export default OfferSlider;
