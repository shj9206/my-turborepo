"use client";
"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BookCover } from "@/app/_components";
import Link from "next/link";

/**
 * 책이미지 설명 섹션 컴포넌트
 * @param items - 책 데이터
 * @description 책 이미지와 설명을 스와이퍼로 감싸서 슬라이드 효과를 줍니다.
 */

export const BookTextSection = ({ items }: { items: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="flex flex-col gap-4 w-full h-full">
      <div className="flex flex-row -mx-6">
        <Swiper
          spaceBetween={8}
          loop={true}
          slidesPerView="auto"
          freeMode={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
          centeredSlides={true}
        >
          {items.map((item: any, index: number) => (
            <SwiperSlide
              key={item.id}
              style={{ width: "auto", display: "flex", alignItems: "end" }}
            >
              <div
                style={{
                  transition: "transform 240ms ease, opacity 240ms ease",
                  transform: index === activeIndex ? "scale(1)" : "scale(0.8)",
                  transformOrigin: "center bottom",
                }}
              >
                <Link href={`/product/${item.isbn13}`}>
                  <BookCover src={item.cover} alt={item.title} size={"sm"} />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-row gap-4 w-full h-[150px] ">
        <div className="flex flex-col gap-2 w-full  items-center overflow-hidden">
          <h2 className="text-lg font-semibold truncate w-full text-center line-clamp-2">
            {items[activeIndex].title}
          </h2>
          <p className="text-sm text-gray-500 text-center">
            {items[activeIndex].description}
          </p>
        </div>
      </div>
    </section>
  );
};
