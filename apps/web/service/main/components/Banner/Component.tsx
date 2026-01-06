"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import {
  Autoplay,
  EffectCreative,
  Pagination,
  Navigation,
} from "swiper/modules";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface BannerItem {
  id: number;
  image: string;
}

const items: BannerItem[] = [
  {
    id: 1,
    image: "/images/bookBanner.jpg",
  },
  {
    id: 2,
    image: "/images/bookBanner2.jpg",
  },
  {
    id: 3,
    image: "/images/banner.jpg",
  },
  {
    id: 4,
    image: "/images/banner2.jpg",
  },
];

export const Banner = () => {
  return (
    <section className="flex flex-row -mr-6">
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        freeMode={true}
        centeredSlides={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative, Pagination, Navigation, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} style={{ width: "auto" }}>
            <div
              className="bg-local bg-cover bg-center w-full h-[250px] md:h-[360px]"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              {/* <h1 className="text-2xl font-bold items-center justify-start text-white">
                Banner
              </h1> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
