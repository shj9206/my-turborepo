"use client";

import {
  IProductDetailResponse,
  PRODUCT_API_KEY,
  PRODUCT_API_URL,
  ProductDetail,
  ProductDetailSkeleton,
} from "@/service/detail";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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
export default function ProductPage({ params: _params }: IProductPageProps) {
  const { isbn13 } = useParams();
  const { data, isLoading } = useQuery<IProductDetailResponse>({
    queryKey: [PRODUCT_API_KEY.PRODUCT, isbn13],
    queryFn: async (): Promise<IProductDetailResponse> => {
      const res = await fetch(`${PRODUCT_API_URL.PRODUCT}/${isbn13}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
    enabled: !!isbn13,
  });

  const item = data?.item?.[0];

  if (isLoading) {
    return (
      <section className="w-full mx-auto flex flex-col">
        <ProductDetailSkeleton />
      </section>
    );
  }

  return (
    <section className="w-full mx-auto flex flex-col">
      {item && <ProductDetail item={item} />}
    </section>
  );
}
