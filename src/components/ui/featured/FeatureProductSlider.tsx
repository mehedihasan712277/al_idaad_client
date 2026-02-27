"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

const FeatureProductSlider = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const handleSwiper = (swiper: SwiperType) => {
        swiperRef.current = swiper;
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const handleSlideChange = (swiper: SwiperType) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    return (
        <div className="feature-slider-wrapper">
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                navigation={false}
                modules={[Navigation]}
                onSwiper={handleSwiper}
                onSlideChange={handleSlideChange}
                onReachBeginning={() => setIsBeginning(true)}
                onReachEnd={() => setIsEnd(true)}
                className="mySwiper"
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
                ].map((speaker, index) => (
                    <SwiperSlide key={index} className="w-62.5!">
                        <div className="flex justify-center rounded-lg overflow-hidden">
                            <Image src={speaker.img} alt="al idaad FeatureProductSlider" width={1920} height={1068} className="w-62.5 h-93.75" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation buttons below */}
            <div className="feature-slider-controls">
                <button
                    className={`feature-slider-btn feature-slider-btn--prev ${isBeginning ? "feature-slider-btn--disabled" : ""}`}
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous slide"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <button
                    className={`feature-slider-btn feature-slider-btn--next ${isEnd ? "feature-slider-btn--disabled" : ""}`}
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next slide"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default FeatureProductSlider;
