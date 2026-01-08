"use client";

import { ProductDetail } from "@/service/detail";

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
 */
export default function ProductPage({ params }: IProductPageProps) {
  return (
    <section className="w-full mx-auto flex flex-col">
      <ProductDetail isbn13={params.isbn13} />
    </section>
  );
}
