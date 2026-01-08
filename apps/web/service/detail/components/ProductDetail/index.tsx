"use client";

import { useView } from "@/app/_provider/viewProvider";
import { ProductDetailMo } from "./ProductDetailMo";
import { ProductDetailPc } from "./ProductDetailPc";
import { IProductDetailProps } from "../../interface";

/**
 * 상품 상세 컴포넌트
 * @param isbn13 - 상품 ISBN13
 * @returns 상품 상세 컴포넌트
 * @description 반응형 상품 상세 컴포넌트, PC, MO 구분
 */
export const ProductDetail = ({ isbn13 }: IProductDetailProps) => {
  const { IS_MOBILE } = useView();
  const Component = IS_MOBILE ? ProductDetailMo : ProductDetailPc;
  return <Component isbn13={isbn13} />;
};
