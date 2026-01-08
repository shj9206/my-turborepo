"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BookCover } from "@/app/_components";
import Link from "next/link";

/**
 * 이미지 섹션 컴포넌트
 * @param items - 이미지 데이터
 * @description 이미지 섹션 컴포넌트는 이미지를 스와이퍼로 감싸서 슬라이드 효과를 줍니다.
 */

export const BookCoverSection = ({ items }: { items: any[] }) => {
  return (
    <section className="flex flex-row -mr-6">
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        freeMode={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {items.map((item: any) => (
          <SwiperSlide key={item.id} style={{ width: "auto" }}>
            <Link href={`/product/${item.isbn13}`}>
            <BookCover src={item.cover} alt={item.title} size="sm" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
