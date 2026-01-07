import { IListItemProps } from "./interface";
import { formatDate, formatPrice } from "@repo/ui";

export const ListItemPC = ({ item, index }: IListItemProps) => {
  const discountRate =
    item.priceStandard && item.priceSales
      ? Math.round(
          ((item.priceStandard - item.priceSales) / item.priceStandard) * 100
        )
      : null;

  return (
    <div
      key={item.isbn || index}
      className="flex gap-4 p-4 rounded-lg  hover:border-gray-300 hover:shadow-md transition-all cursor-pointer bg-white group"
    >
      {item.cover && (
        <div className="flex-shrink-0">
          <img
            src={item.cover}
            alt={item.title}
            className="w-32 h-44 object-cover shadow-md group-hover:shadow-lg transition-shadow"
          />
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
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
        </div>

        {/* 메타 정보: 저자, 출판사, 출판일 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {item.author && <span className="font-medium">{item.author}</span>}
            {item.publisher && (
              <>
                <span className="text-gray-400">·</span>
                <span>{item.publisher}</span>
              </>
            )}
            {item.pubDate && (
              <>
                <span className="text-gray-400">·</span>
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
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(item.priceStandard)}원
                    </span>
                  )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            {item.customerReviewRank && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span>{item.customerReviewRank.toFixed(1)}</span>
              </div>
            )}
            {item.salesPoint && (
              <div className="flex items-center gap-1">
                <span className="text-blue-500 font-semibold">판매지수</span>
                <span>{formatPrice(item.salesPoint)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
