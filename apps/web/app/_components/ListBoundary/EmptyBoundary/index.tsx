import { useView } from "@/app/_provider/viewProvider";
import { cn } from "@repo/util";

interface IEmptyBoundaryProps {
  isEmpty: boolean;
  children: React.ReactNode;
  message?: string;
}

export const EmptyBoundary = ({
  isEmpty,
  children,
  message = "검색 결과가 없습니다.",
}: IEmptyBoundaryProps) => {
  const { IS_MOBILE } = useView();

  if (isEmpty) {
    return (
      <div
        className={cn(
          "w-full flex flex-col items-center justify-center",
          IS_MOBILE ? "px-4 py-12" : "max-w-7xl mx-auto px-6 py-16"
        )}
      >
        {/* 아이콘 영역 */}
        <div
          className={cn(
            "flex items-center justify-center mb-4 text-gray-300",
            IS_MOBILE ? "w-16 h-16" : "w-20 h-20"
          )}
        >
          <svg
            className={cn("w-full h-full")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* 메시지 영역 */}
        <div className="text-center">
          <p
            className={cn(
              "text-gray-500 font-medium",
              IS_MOBILE ? "text-sm" : "text-base"
            )}
          >
            {message}
          </p>
          <p
            className={cn(
              "text-gray-400 mt-2",
              IS_MOBILE ? "text-xs" : "text-sm"
            )}
          >
            다른 검색어로 시도해보세요.
          </p>
        </div>
      </div>
    );
  }
  return children;
};
