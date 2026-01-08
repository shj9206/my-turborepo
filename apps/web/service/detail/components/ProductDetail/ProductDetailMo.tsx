"use client";

import { useQuery } from "@tanstack/react-query";
import {
  PRODUCT_API_KEY,
  PRODUCT_API_URL,
} from "../../constants/productApiKey";
import { IProductDetailResponse, IProductDetailProps } from "../../interface";
import { formatDate, formatPrice } from "@repo/ui";
import { ListBoundary } from "@/app/_components/ListBoundary";

/**
 * 모바일 상품 상세 컴포넌트
 * @param isbn - 상품 ISBN
 * @returns 모바일 상품 상세 컴포넌트
 * @description 모바일 상품 상세 컴포넌트
 */
export const ProductDetailMo = ({ item }: IProductDetailProps) => {
  const discountRate =
    item?.priceStandard && item?.priceSales
      ? Math.round(
          ((item.priceStandard - item.priceSales) / item.priceStandard) * 100
        )
      : null;

  return (
    <>
      {item && (
        <div className="w-full px-4 py-6">
          <div className="flex flex-col gap-6 bg-white rounded-lg shadow-lg p-4">
            {/* 책 표지 */}
            {item.cover && (
              <div className="flex justify-center">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-48 h-72 object-cover shadow-xl rounded-lg"
                />
              </div>
            )}

            {/* 상세 정보 */}
            <div className="flex flex-col gap-4">
              {/* 카테고리 */}
              {item.categoryName && (
                <span className="text-xs text-blue-600 font-medium">
                  {item.categoryName}
                </span>
              )}

              {/* 제목 */}
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                {item.title}
              </h1>

              {/* 메타 정보 */}
              <div className="flex flex-col gap-2 text-sm text-gray-700">
                {item.author && (
                  <div>
                    <span className="font-semibold">저자:</span> {item.author}
                  </div>
                )}
                {item.publisher && (
                  <div>
                    <span className="font-semibold">출판사:</span>{" "}
                    {item.publisher}
                  </div>
                )}
                {item.pubDate && (
                  <div>
                    <span className="font-semibold">출판일:</span>{" "}
                    {formatDate(item.pubDate)}
                  </div>
                )}
                {item.isbn && (
                  <div>
                    <span className="font-semibold">ISBN:</span> {item.isbn}
                  </div>
                )}
                {item.isbn13 && (
                  <div>
                    <span className="font-semibold">ISBN13:</span> {item.isbn13}
                  </div>
                )}
              </div>

              {/* 가격 정보 */}
              {item.priceSales && (
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(item.priceSales)}원
                    </span>
                    {discountRate && discountRate > 0 && (
                      <span className="text-base font-semibold text-red-600">
                        {discountRate}% 할인
                      </span>
                    )}
                  </div>
                  {item.priceStandard &&
                    item.priceStandard !== item.priceSales && (
                      <span className="text-sm text-gray-400 line-through">
                        정가: {formatPrice(item.priceStandard)}원
                      </span>
                    )}
                </div>
              )}

              {/* 평점 및 판매지수 */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                {item.customerReviewRank && (
                  <div className="flex items-center gap-1">
                    <span className="text-xl text-yellow-500">★</span>
                    <span className="text-base font-semibold text-gray-700">
                      {item.customerReviewRank.toFixed(1)}
                    </span>
                  </div>
                )}
                {item.salesPoint && (
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-blue-600">
                      판매지수:
                    </span>
                    <span className="text-sm text-gray-700">
                      {formatPrice(item.salesPoint)}
                    </span>
                  </div>
                )}
              </div>

              {/* 설명 */}
              {item.description && (
                <div className="pt-4 border-t border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">
                    책 소개
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
