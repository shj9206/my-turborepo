"use client";

import { ProductDetail, ProductDetailSkeleton } from "@/service/detail";
import { Suspense } from "react";

interface IProductPageProps {
  params: {
    isbn13: string;
  };
}

/**
 * 상품 상세 페이지
 * @param params - 라우트 파라미터 (isbn13)
 * @returns 상품 상세 페이지 컴포넌트
 * @description ISBN을 기반으로 상품 상세 정보를 표시하는 페이지
 * Suspense로 로딩 상태를 처리합니다.
 */
export default function ProductPage({ params }: IProductPageProps) {
  const { isbn13 } = params;

  return (
    <section className="w-full mx-auto flex flex-col">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail isbn13={isbn13} />
      </Suspense>
    </section>
  );
}
