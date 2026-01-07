import { ISkeletonBoundaryProps } from "./interface";

export const SkeletonBoundaryMo = (props: ISkeletonBoundaryProps) => {
  const { isFirstLoading } = props;
  if (isFirstLoading) {
    return (
      <section className="w-full flex flex-col gap-4 px-4 py-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className="flex gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 rounded-lg bg-white border-b border-gray-200 animate-pulse"
            key={index}
          >
            {/* 이미지 스켈레톤 */}
            <div className="flex-shrink-0 relative">
              <div className="w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32 lg:w-28 lg:h-36 bg-gray-200 rounded shadow-sm" />
            </div>

            <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 flex-1 min-w-0">
              {/* 카테고리 스켈레톤 */}
              <div className="h-3 sm:h-3.5 md:h-4 w-20 sm:w-24 bg-gray-200 rounded" />

              {/* 제목 스켈레톤 */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="h-3.5 sm:h-4 md:h-5 w-full bg-gray-200 rounded" />
                <div className="h-3.5 sm:h-4 md:h-5 w-4/5 bg-gray-200 rounded" />
              </div>

              {/* 저자, 출판사, 출판일 스켈레톤 */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                <div className="h-3 sm:h-3.5 md:h-4 w-16 sm:w-20 bg-gray-200 rounded" />
                <div className="h-3 sm:h-3.5 md:h-4 w-1 bg-gray-200 rounded hidden sm:block" />
                <div className="h-3 sm:h-3.5 md:h-4 w-12 sm:w-16 bg-gray-200 rounded" />
                <div className="h-3 sm:h-3.5 md:h-4 w-1 bg-gray-200 rounded hidden sm:block" />
                <div className="h-3 sm:h-3.5 md:h-4 w-14 sm:w-20 bg-gray-200 rounded hidden sm:block" />
              </div>

              {/* 설명 스켈레톤 (큰 화면에서만) */}
              <div className="space-y-1.5 hidden md:block">
                <div className="h-3 md:h-3.5 lg:h-4 w-full bg-gray-200 rounded" />
                <div className="h-3 md:h-3.5 lg:h-4 w-5/6 bg-gray-200 rounded" />
              </div>

              {/* 가격 정보 스켈레톤 */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-auto">
                <div className="h-4 sm:h-5 md:h-6 w-24 sm:w-28 md:w-32 bg-gray-200 rounded" />
                <div className="h-3.5 sm:h-4 w-10 sm:w-12 bg-gray-200 rounded" />
                <div className="h-3 sm:h-3.5 md:h-4 w-16 sm:w-20 bg-gray-200 rounded" />
              </div>

              {/* 하단 정보: 평점, 판매지수 스켈레톤 */}
              <div className="flex items-center gap-2 sm:gap-3 mt-1 pt-1.5 sm:pt-2 border-t border-gray-100">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <div className="h-3 sm:h-3.5 md:h-4 w-3 sm:w-4 bg-gray-200 rounded" />
                  <div className="h-3 sm:h-3.5 md:h-4 w-6 sm:w-8 bg-gray-200 rounded" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 sm:h-3.5 md:h-4 w-12 sm:w-16 bg-gray-200 rounded hidden sm:block" />
                  <div className="h-3 sm:h-3.5 md:h-4 w-8 sm:w-12 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
  return props.children;
};
