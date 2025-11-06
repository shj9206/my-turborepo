"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ResponsiveCard } from "@repo/ui";

/**
 * 카드 섹션 컴포넌트
 * @param items - 카드 데이터
 * @description 카드 섹션 컴포넌트는 카드 데이터를 스와이퍼로 감싸서 슬라이드 효과를 줍니다.
 */

export const ResponsiveCardSection = ({ items }: { items: any[] }) => {
  return (
    <section className="flex flex-row -mx-6">
      <Swiper
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        slidesPerView={1.2}
        freeMode={true}
        centeredSlides={true}
        spaceBetween={16}
        style={{ padding: "0 16px 16px 16px" }}
      >
        {items.map((item: any, index: number) => (
          <SwiperSlide key={item.id} style={{ width: "auto" }}>
            <ResponsiveCard
              imageUrl={item.cover}
              title={item.author}
              subTitle={item.title}
              description={item.description}
              link={item.link}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
