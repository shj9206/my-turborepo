"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { BookCard } from "../../bookCard";
import "swiper/css";
import Link from "next/link";

/**
 * 카드 섹션 컴포넌트
 * @param items - 카드 데이터
 * @description 카드 섹션 컴포넌트는 카드 데이터를 스와이퍼로 감싸서 슬라이드 효과를 줍니다.
 */

export const BookCardSection = ({ items }: { items: any[] }) => {
  return (
    <section className="flex flex-row -mx-6">
      <Swiper
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        slidesPerView="auto"
        freeMode={true}
        centeredSlides={true}
        spaceBetween={16}
      >
        {items.map((item: any, index: number) => (
          <SwiperSlide key={item.id} style={{ width: "auto" }}>
            <Link href={`/product/${item.isbn13}`}>
              <BookCard
                index={index ?? 0}
                key={item.id}
                imageUrl={item.cover}
                title={item.title}
                author={item.author}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
