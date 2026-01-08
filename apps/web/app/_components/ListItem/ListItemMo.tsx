import { IListItemProps } from "./interface";
import { formatDate, formatPrice } from "@repo/ui";
import { BookCover } from "@/app/_components";

/**
 * 모바일 리스트 아이템
 * @param item - 리스트 아이템 데이터
 * @param index - 리스트 아이템 인덱스
 * @returns 리스트 아이템 모바일 컴포넌트
 * @description 반응형 모바일 리스트 아이템 컴포넌트
 */
export const ListItemMo = ({
  item,
  index,
  handleOnClick,
}: IListItemProps & { handleOnClick: () => void }) => {
  const discountRate =
    item.priceStandard && item.priceSales
      ? Math.round(
          ((item.priceStandard - item.priceSales) / item.priceStandard) * 100
        )
      : null;

  return (
    <article
      key={item.isbn || index}
      tabIndex={0}
      aria-label={`${item.title}${item.author ? ` - ${item.author}` : ""} 상세 정보 보기`}
      className="group flex gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 rounded-lg bg-white border-b border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 active:scale-[0.98] md:hover:scale-[1.01]"
      onClick={handleOnClick}
    >
      {item.cover && (
        <div className="flex-shrink-0">
          <BookCover src={item.cover} alt={item.title} isAdult={item.adult} />
        </div>
      )}

      <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 flex-1 min-w-0">
        {/* 카테고리 */}
        {item.categoryName && (
          <span className="text-[9px] sm:text-[10px] md:text-xs text-blue-600 font-medium leading-tight">
            {item.categoryName}
          </span>
        )}

        {/* 제목 */}
        <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors duration-200">
          {item.title}
        </h2>

        {/* 저자, 출판사, 출판일 */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] md:text-xs text-gray-600">
          {item.author && (
            <span className="font-medium truncate max-w-[120px] sm:max-w-none">
              {item.author}
            </span>
          )}
          {item.publisher && (
            <>
              <span
                className="text-gray-500 hidden sm:inline"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="truncate max-w-[100px] sm:max-w-none">
                {item.publisher}
              </span>
            </>
          )}
          {item.pubDate && (
            <>
              <span
                className="text-gray-500 hidden sm:inline"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="hidden sm:inline">
                {formatDate(item.pubDate)}
              </span>
            </>
          )}
        </div>

        {/* 설명 */}
        {item.description && (
          <p className="hidden md:block text-[11px] lg:text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* 가격 정보 */}
        {item.priceSales && (
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-auto">
            <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
              {formatPrice(item.priceSales)}원
            </span>
            {discountRate && discountRate > 0 && (
              <span className="text-[10px] sm:text-xs font-semibold text-red-600 px-1.5 py-0.5 rounded">
                {discountRate}%
              </span>
            )}
            {item.priceStandard && item.priceStandard !== item.priceSales && (
              <span
                className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 line-through"
                aria-label={`정가 ${formatPrice(item.priceStandard)}원`}
              >
                {formatPrice(item.priceStandard)}원
              </span>
            )}
          </div>
        )}

        {/* 하단 정보: 평점, 판매지수 */}
        <div className="flex items-center gap-2 sm:gap-3 mt-1 pt-1.5 sm:pt-2 border-t border-gray-100">
          {item.customerReviewRank && (
            <div
              className="flex items-center gap-0.5 sm:gap-1"
              aria-label={`평점 ${item.customerReviewRank.toFixed(1)}점`}
            >
              <span
                className="text-yellow-500 text-xs sm:text-sm"
                aria-hidden="true"
              >
                ★
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 font-medium">
                {item.customerReviewRank.toFixed(1)}
              </span>
            </div>
          )}
          {item.salesPoint && (
            <div
              className="flex items-center gap-1"
              aria-label={`판매지수 ${formatPrice(item.salesPoint)}`}
            >
              <span className="text-[9px] sm:text-[10px] md:text-xs text-blue-600 font-semibold hidden sm:inline">
                판매지수
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                {formatPrice(item.salesPoint)}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
