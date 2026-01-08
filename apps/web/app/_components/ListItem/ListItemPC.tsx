import { IListItemProps } from "./interface";
import { formatDate, formatPrice } from "@repo/ui";
import { BookCover } from "@/app/_components";

/**
 * PC 리스트 아이템
 * @param item - 리스트 아이템 데이터
 * @param index - 리스트 아이템 인덱스
 * @returns 리스트 아이템 PC 컴포넌트
 * @description  PC 리스트 아이템 컴포넌트
 */

export const ListItemPC = ({
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
      className="flex gap-4 p-4 rounded-lg hover:border-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all cursor-pointer bg-white group"
      onClick={handleOnClick}
    >
      {item.cover && (
        <div className="flex-shrink-0">
          <BookCover src={item.cover} alt={item.title} />
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0 gap-3">
        {/* 헤더: 제목, 카테고리 */}
        <div className="flex flex-col gap-2">
          {item.categoryName && (
            <span className="text-xs text-blue-600 font-medium">
              {item.categoryName}
            </span>
          )}
          <h2 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h2>
        </div>

        {/* 메타 정보: 저자, 출판사, 출판일 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {item.author && <span className="font-medium">{item.author}</span>}
            {item.publisher && (
              <>
                <span className="text-gray-500" aria-hidden="true">
                  ·
                </span>
                <span>{item.publisher}</span>
              </>
            )}
            {item.pubDate && (
              <>
                <span className="text-gray-500" aria-hidden="true">
                  ·
                </span>
                <span>{formatDate(item.pubDate)}</span>
              </>
            )}
          </div>
        </div>

        {/* 설명 */}
        {item.description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* 하단: 가격, 평점, 판매 포인트 */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div className="flex flex-col gap-1">
            {item.priceSales && (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(item.priceSales)}원
                </span>
                {discountRate && discountRate > 0 && (
                  <span className="text-sm font-semibold text-red-600">
                    {discountRate}% 할인
                  </span>
                )}
                {item.priceStandard &&
                  item.priceStandard !== item.priceSales && (
                    <span
                      className="text-sm text-gray-600 line-through"
                      aria-label={`정가 ${formatPrice(item.priceStandard)}원`}
                    >
                      {formatPrice(item.priceStandard)}원
                    </span>
                  )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-600">
            {item.customerReviewRank && (
              <div
                className="flex items-center gap-1"
                aria-label={`평점 ${item.customerReviewRank.toFixed(1)}점`}
              >
                <span className="text-yellow-500" aria-hidden="true">
                  ★
                </span>
                <span>{item.customerReviewRank.toFixed(1)}</span>
              </div>
            )}
            {item.salesPoint && (
              <div
                className="flex items-center gap-1"
                aria-label={`판매지수 ${formatPrice(item.salesPoint)}`}
              >
                <span className="text-blue-600 font-semibold">판매지수</span>
                <span>{formatPrice(item.salesPoint)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
