import { IPageNationProps } from "./interface";
import { useMemo } from "react";
import { Icon } from "../../elements/icon";

export const PageNation = ({
  totalPages,
  currentPage,
  onPageChange,
}: IPageNationProps) => {
  // 페이지 번호 배열 생성 (스마트한 생략 처리)
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // 최대 표시할 페이지 수

    if (totalPages <= maxVisible) {
      // 전체 페이지가 적으면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const current = Number(currentPage);
      const total = Number(totalPages);

      // 현재 페이지 주변 계산
      let startPage = Math.max(1, current - 1);
      let endPage = Math.min(total, current + 1);

      // 시작 부분 처리 (현재 페이지가 1~3일 때)
      if (current <= 3) {
        startPage = 1;
        endPage = 4;
        // 첫 페이지들 추가
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        // 끝 생략 표시
        if (endPage < total - 1) {
          pages.push("ellipsis-end");
        }
        // 마지막 페이지
        if (endPage < total) {
          pages.push(total);
        }
      }
      // 끝 부분 처리 (현재 페이지가 끝 부분에 가까울 때)
      else if (current >= total - 2) {
        startPage = total - 3;
        endPage = total;
        // 첫 페이지
        pages.push(1);
        // 시작 생략 표시
        if (startPage > 2) {
          pages.push("ellipsis-start");
        }
        // 끝 페이지들 추가
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }
      // 중간 부분 처리 (현재 페이지가 중간에 있을 때)
      else {
        startPage = current - 1;
        endPage = current + 1;
        // 첫 페이지와 시작 생략 표시 없이 시작
        // 중간 페이지들 추가
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        // 끝 생략 표시
        if (endPage < total - 1) {
          pages.push("ellipsis-end");
        }
        // 마지막 페이지
        if (endPage < total) {
          pages.push(total);
        }
      }
    }

    return pages;
  }, [totalPages, currentPage]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="flex items-center justify-center gap-1 sm:gap-2"
      aria-label="페이지 네비게이션"
    >
      {/* 첫 페이지로 이동 */}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="첫 페이지로 이동"
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-gray-60 hover:bg-gray-10 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
        >
          <Icon name="chevronDoubleLeft" className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
      {/* 이전 페이지 */}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(Number(currentPage) - 1)}
          disabled={currentPage === 1}
          aria-label="이전 페이지"
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-gray-60 hover:bg-gray-10 hover:text-gray-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
        >
          <Icon name="chevronLeft" className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
      {/* 페이지 번호들 */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-gray-400 select-none"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum.toString() === currentPage.toString();
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              aria-label={`페이지 ${pageNum}`}
              aria-current={isActive ? "page" : undefined}
              className={`
                flex items-center justify-center min-w-[2rem] h-8 sm:min-w-[2.5rem] sm:h-10 px-2 rounded-lg font-medium text-sm sm:text-base
                transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-50 text-white shadow-md shadow-blue-50/30 scale-105 font-bold"
                    : "text-gray-70 hover:bg-gray-10 hover:text-gray-90"
                }
              `}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* 다음 페이지 */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(Number(currentPage) + 1)}
          aria-label="다음 페이지"
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-gray-60 hover:bg-gray-10 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
        >
          <Icon name="chevronRight" className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* 마지막 페이지로 이동 */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          aria-label="마지막 페이지로 이동"
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-gray-60 hover:bg-gray-10 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-200"
        >
          <Icon name="chevronDoubleRight" className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
    </nav>
  );
};
