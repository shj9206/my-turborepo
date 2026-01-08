"use client";

import { useView } from "@/app/_provider/viewProvider";
import { ProductDetailMo } from "./ProductDetailMo";
import { ProductDetailPc } from "./ProductDetailPc";
import {  IProductDetailResponse } from "../../interface";
import { PRODUCT_API_KEY } from "../../constants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PRODUCT_API_URL } from "../../constants/productApiKey";

/**
 * 상품 상세 컴포넌트
 * @param isbn13 - 상품 ISBN13
 * @returns 상품 상세 컴포넌트
 * @description 반응형 상품 상세 컴포넌트, PC, MO 구분
 */
export const ProductDetail = ({ isbn13  }: {isbn13:string}) => {
  const { IS_MOBILE } = useView();
  const { data } = useSuspenseQuery<IProductDetailResponse>({
    queryKey: [PRODUCT_API_KEY.PRODUCT, isbn13],
    queryFn: async (): Promise<IProductDetailResponse> => {
      const res = await fetch(`${PRODUCT_API_URL.PRODUCT}/${isbn13}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
  });

  const item = data?.item?.[0];

  if (!item) {
    return null;
  }
  const Component = IS_MOBILE ? ProductDetailMo : ProductDetailPc;
  return <Component item={item} />;
};
