"use client";

import Image from "next/image";
import { cn } from "@repo/util";
import { useView } from "@/app/_provider/viewProvider";

// 성인 콘텐츠 대체 이미지 (SVG Data URL)
const ADULT_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='176'%3E%3Crect width='128' height='176' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' font-weight='bold' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3E19+%3C/text%3E%3C/svg%3E";

export const BookCover = ({
  src,
  alt,
  className,
  isAdult = false,
  size = "md",
}: {
  src: string;
  alt: string;
  className?: string;
  isAdult?: boolean;
  size?: "xs" | "sm" | "md";
}) => {
  const { IS_MOBILE } = useView();

  // 성인 콘텐츠인 경우 대체 이미지 사용
  const imageSrc = isAdult ? ADULT_PLACEHOLDER : src;

  // 모바일인 경우 반응형 크기 클래스 사용
  const getResponsiveClassName = () => {
    if (IS_MOBILE) {
      // 모바일: 반응형 크기 (xs: 작은 모바일, sm: 큰 모바일, md: 태블릿)
      return "w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32 lg:w-28 lg:h-36";
    }
    // PC: size prop에 따른 고정 크기
    return className || "w-32 h-44";
  };

  // 모바일인 경우 반응형 width/height, PC인 경우 size prop 사용
  const getImageDimensions = () => {
    if (IS_MOBILE) {
      // 모바일: 반응형을 위해 충분히 큰 값 사용 (실제 크기는 className으로 제어)
      return { width: 112, height: 144 };
    }
    // PC: size prop에 따른 크기
    return {
      width: size === "xs" ? 100 : size === "sm" ? 128 : 248,
      height: size === "xs" ? 140 : size === "sm" ? 178 : 364,
    };
  };

  const dimensions = getImageDimensions();

  return (
    <div className="flex-shrink-0 relative">
      <Image
        src={imageSrc}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className={cn(
          "object-cover shadow-md group-hover:shadow-lg transition-shadow",
          getResponsiveClassName()
        )}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k="
      />
      {isAdult && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-90">
          <span className="text-gray-500 font-bold text-lg">19+</span>
        </div>
      )}
    </div>
  );
};
