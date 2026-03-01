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
                {[
                    { img: "https://i.postimg.cc/V5PC9DSM/offer-main.png" },
                    { img: "https://i.postimg.cc/DwgXsQ7Q/offer.png" },
                    // { img: "https://i.postimg.cc/kMtp7Gy1/offer-t.jpg" },
                    // { img: "https://i.postimg.cc/HkdKM9pK/thobe-4.jpg" },
                ].map((speaker, index) => (
                    <SwiperSlide key={index}>
                        {/* Image */}
                        <div className="flex justify-center relative h-[30vw] xl:h-95">
                            <Image
                                src={speaker.img}
                                alt="al idaad offer product"
                                width={1920}
                                height={1068}
                                className="absolute left-0 right-0 h-[30vw] xl:h-95 rounded"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
export default OfferSlider;
