"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BookCover } from "@repo/ui";

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
            <BookCover imageUrl={item.cover} size="sm" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
