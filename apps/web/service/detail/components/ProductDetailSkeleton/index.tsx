"use client";

import { useView } from "@/app/_provider/viewProvider";
import { ProductDetailSkeletonMo } from "./ProductDetailSkeletonMo";
import { ProductDetailSkeletonPc } from "./ProductDetailSkeletonPc";

/**
 * 상품 상세 스켈레톤 컴포넌트
 * @returns 상품 상세 스켈레톤 컴포넌트
 * @description 반응형 상품 상세 스켈레톤 컴포넌트, PC, MO 구분
 */
export const ProductDetailSkeleton = () => {
  const { IS_MOBILE } = useView();
  const Component = IS_MOBILE
    ? ProductDetailSkeletonMo
    : ProductDetailSkeletonPc;
  return <Component />;
};
