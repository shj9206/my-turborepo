import { ISkeletonBoundaryProps } from "./interface";

export const SkeletonBoundaryPc = (props: ISkeletonBoundaryProps) => {
  const { isFirstLoading } = props;
  if (isFirstLoading) {
    return (
      <section className="w-full flex flex-col gap-4 mx-auto px-6 py-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className="flex gap-4 p-4 rounded-lg bg-white animate-pulse"
            key={index}
          >
            {/* 이미지 스켈레톤 */}
            <div className="flex-shrink-0">
              <div className="w-32 h-44 bg-gray-200 rounded shadow-md" />
            </div>

            <div className="flex flex-col flex-1 min-w-0 gap-3">
              {/* 헤더: 카테고리, 제목 */}
              <div className="flex flex-col gap-2">
                {/* 카테고리 스켈레톤 */}
                <div className="h-4 w-24 bg-gray-200 rounded" />
                {/* 제목 스켈레톤 */}
              </div>

              {/* 설명 스켈레톤 */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>

              {/* 메타 정보 스켈레톤 */}
              <div className="flex flex-col gap-1">
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>

              {/* 하단: 가격, 평점, 판매지수 스켈레톤 */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-32 bg-gray-200 rounded" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-gray-200 rounded" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                  </div>
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
