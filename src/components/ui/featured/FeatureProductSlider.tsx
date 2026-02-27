"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// import "./style.css";

// import required modules
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const FeatureProductSlider = () => {
    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                loop={true}
                // pagination={{
                //     clickable: true,
                // }}
                modules={[Autoplay]}
                className="mySwiper max-w-7xl mx-auto"
            >
                {[
                    { img: "https://i.postimg.cc/SQ6SWV68/mt-1.webp" },
                    { img: "https://i.postimg.cc/zDCznpCC/mt-2.webp" },
                    { img: "https://i.postimg.cc/Vsqfj4q9/mt-3.webp" },
                    { img: "https://i.postimg.cc/KcPGnQPf/mt-4.webp" },

                    { img: "https://i.postimg.cc/SQ6SWV68/mt-1.webp" },
                    { img: "https://i.postimg.cc/zDCznpCC/mt-2.webp" },
                    { img: "https://i.postimg.cc/Vsqfj4q9/mt-3.webp" },
                    { img: "https://i.postimg.cc/KcPGnQPf/mt-4.webp" },

                    { img: "https://i.postimg.cc/SQ6SWV68/mt-1.webp" },
                    { img: "https://i.postimg.cc/zDCznpCC/mt-2.webp" },
                    { img: "https://i.postimg.cc/Vsqfj4q9/mt-3.webp" },
                    { img: "https://i.postimg.cc/KcPGnQPf/mt-4.webp" },
                ].map((speaker, index) => (
                    <SwiperSlide key={index} className="w-62.5!">
                        {/* Image */}
                        <div className="flex justify-center rounded-lg overflow-hidden">
                            <Image src={speaker.img} alt="al idaad FeatureProductSlider" width={1920} height={1068} className="w-62.5 h-93.75" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};
export default FeatureProductSlider;
