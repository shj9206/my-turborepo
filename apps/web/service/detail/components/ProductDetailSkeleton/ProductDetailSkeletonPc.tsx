"use client";

/**
 * PC 상품 상세 스켈레톤 컴포넌트
 * @returns PC 상품 상세 스켈레톤 컴포넌트
 * @description PC 상품 상세 스켈레톤 컴포넌트
 */
export const ProductDetailSkeletonPc = () => {
  return (
    <div className="w-full mx-auto px-6 py-8">
      <div className="flex gap-8 bg-white rounded-lg shadow-lg p-8 animate-pulse">
        {/* 책 표지 스켈레톤 */}
        <div className="flex-shrink-0">
          <div className="w-64 h-96 bg-gray-200 rounded-lg shadow-xl" />
        </div>

        {/* 상세 정보 스켈레톤 */}
        <div className="flex flex-col flex-1 gap-6">
          {/* 카테고리 스켈레톤 */}
          <div className="h-5 w-24 bg-gray-200 rounded" />

          {/* 제목 스켈레톤 */}
          <div className="space-y-2">
            <div className="h-8 w-full bg-gray-200 rounded" />
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
          </div>

          {/* 메타 정보 스켈레톤 */}
          <div className="flex flex-col gap-2">
            <div className="h-5 w-48 bg-gray-200 rounded" />
            <div className="h-5 w-40 bg-gray-200 rounded" />
            <div className="h-5 w-36 bg-gray-200 rounded" />
            <div className="h-5 w-44 bg-gray-200 rounded" />
            <div className="h-5 w-48 bg-gray-200 rounded" />
          </div>

          {/* 가격 정보 스켈레톤 */}
          <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="h-9 w-40 bg-gray-200 rounded" />
              <div className="h-6 w-20 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-32 bg-gray-200 rounded" />
          </div>

          {/* 평점 및 판매지수 스켈레톤 */}
          <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-gray-200 rounded" />
              <div className="h-6 w-12 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-20 bg-gray-200 rounded" />
              <div className="h-6 w-16 bg-gray-200 rounded" />
            </div>
          </div>

          {/* 설명 스켈레톤 */}
          <div className="pt-4 border-t border-gray-200">
            <div className="h-7 w-24 bg-gray-200 rounded mb-3" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

