import { IListItemProps } from "./interface";
import { formatDate, formatPrice } from "@repo/ui";

export const ListItemMo = ({ item, index }: IListItemProps) => {
  const discountRate =
    item.priceStandard && item.priceSales
      ? Math.round(
          ((item.priceStandard - item.priceSales) / item.priceStandard) * 100
        )
      : null;

  return (
    <div
      key={item.isbn || index}
      className="flex gap-3 p-3 rounded-lg bg-white border-b border-gray-200 cursor-pointer hover:border-gray-300 hover:shadow-md transition-all active:scale-[0.98]"
    >
      {item.cover && (
        <div className="flex-shrink-0 relative">
          <img
            src={item.cover}
            alt={item.title}
            className="w-20 h-28 object-cover rounded shadow-sm"
          />
          {item.adult && (
            <div className="absolute top-1 right-1 bg-red-500 text-white text-[8px] px-1 py-0.5 rounded font-bold">
              19+
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        {/* 카테고리 */}
        {item.categoryName && (
          <span className="text-[10px] text-blue-600 font-medium leading-tight">
            {item.categoryName}
          </span>
        )}

        {/* 제목 */}
        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">
          {item.title}
        </h3>

        {/* 저자, 출판사, 출판일 */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-600">
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

        {/* 설명 */}
        {item.description && (
          <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* 가격 정보 */}
        {item.priceSales && (
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className="text-base font-bold text-gray-900">
              {formatPrice(item.priceSales)}원
            </span>
            {discountRate && discountRate > 0 && (
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                {discountRate}%
              </span>
            )}
            {item.priceStandard && item.priceStandard !== item.priceSales && (
              <span className="text-[10px] text-gray-400 line-through">
                {formatPrice(item.priceStandard)}원
              </span>
            )}
          </div>
        )}

        {/* 하단 정보: 평점, 판매지수 */}
        <div className="flex items-center gap-3 mt-1 pt-1.5 border-t border-gray-100">
          {item.customerReviewRank && (
            <div className="flex items-center gap-0.5">
              <span className="text-yellow-500 text-xs">★</span>
              <span className="text-[10px] text-gray-600 font-medium">
                {item.customerReviewRank.toFixed(1)}
              </span>
            </div>
          )}
          {item.salesPoint && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-blue-600 font-semibold">
                판매지수
              </span>
              <span className="text-[10px] text-gray-600">
                {formatPrice(item.salesPoint)}
              </span>
            </div>
          )}
          {item.fixedPrice && (
            <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
              정가제
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
