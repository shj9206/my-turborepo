"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { BookCard } from "../../bookCard";
import "swiper/css";

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
            <BookCard
              index={index ?? 0}
              key={item.id}
              imageUrl={item.cover}
              title={item.title}
              author={item.author}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
