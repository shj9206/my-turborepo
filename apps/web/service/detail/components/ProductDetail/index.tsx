"use client";

import { useView } from "@/app/_provider/viewProvider";
import { ProductDetailMo } from "./ProductDetailMo";
import { ProductDetailPc } from "./ProductDetailPc";
import { IProductDetailResponse } from "../../interface";

/**
 * 상품 상세 컴포넌트
 * @param initialData - 서버에서 가져온 초기 상품 데이터 (선택적)
 * @param isbn13 - 상품 ISBN13 (initialData가 없을 때만 사용)
 * @returns 상품 상세 컴포넌트
 * @description 반응형 상품 상세 컴포넌트, PC, MO 구분
 * initialData가 제공되면 서버에서 가져온 데이터를 사용하여 중복 fetch를 방지합니다.
 */
export const ProductDetail = ({
  initialData,
}: {
  initialData: IProductDetailResponse;
}) => {
  const { IS_MOBILE } = useView();

  // 서버 컴포넌트에서 이미 검증했지만, 방어적으로 처리
  if (!initialData) {
    return null;
  }

  const item = initialData?.item?.[0];

  if (!item) {
    return null;
  }

  const Component = IS_MOBILE ? ProductDetailMo : ProductDetailPc;
  return <Component item={item} />;
};
