"use client";

/**
 * 모바일 상품 상세 스켈레톤 컴포넌트
 * @returns 모바일 상품 상세 스켈레톤 컴포넌트
 * @description 모바일 상품 상세 스켈레톤 컴포넌트
 */
export const ProductDetailSkeletonMo = () => {
  return (
    <div className="w-full px-4 py-6">
      <div className="flex flex-col gap-6 bg-white rounded-lg shadow-lg p-4 animate-pulse">
        {/* 책 표지 스켈레톤 */}
        <div className="flex justify-center">
          <div className="w-48 h-72 bg-gray-200 rounded-lg shadow-xl" />
        </div>

        {/* 상세 정보 스켈레톤 */}
        <div className="flex flex-col gap-4">
          {/* 카테고리 스켈레톤 */}
          <div className="h-4 w-20 bg-gray-200 rounded" />

          {/* 제목 스켈레톤 */}
          <div className="space-y-2">
            <div className="h-6 w-full bg-gray-200 rounded" />
            <div className="h-6 w-3/4 bg-gray-200 rounded" />
          </div>

          {/* 메타 정보 스켈레톤 */}
          <div className="flex flex-col gap-2">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
            <div className="h-4 w-36 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>

          {/* 가격 정보 스켈레톤 */}
          <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-8 w-32 bg-gray-200 rounded" />
              <div className="h-5 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>

          {/* 평점 및 판매지수 스켈레톤 */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-1">
              <div className="h-5 w-5 bg-gray-200 rounded" />
              <div className="h-5 w-10 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
            </div>
          </div>

          {/* 설명 스켈레톤 */}
          <div className="pt-4 border-t border-gray-200">
            <div className="h-6 w-20 bg-gray-200 rounded mb-2" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-full bg-gray-200 rounded" />
              <div className="h-3 w-5/6 bg-gray-200 rounded" />
              <div className="h-3 w-4/6 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

