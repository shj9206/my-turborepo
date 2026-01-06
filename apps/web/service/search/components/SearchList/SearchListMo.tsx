"use client";

import { ISearchListProps } from "./interface";

export const SearchListMo = ({
  data,
  isLoading,
  error,
  query,
}: ISearchListProps) => {
  if (isLoading) {
    return (
      <div className="w-full px-4 py-6">
        <p className="text-center text-gray-500">검색 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 py-6">
        <p className="text-center text-red-500">에러: {error.message}</p>
      </div>
    );
  }

  if (!data || !data.item || data.item.length === 0) {
    return (
      <div className="w-full px-4 py-6">
        <p className="text-center text-gray-500">
          {query
            ? `"${query}"에 대한 검색 결과가 없습니다.`
            : "검색어를 입력해주세요."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-1">
          {query ? `"${query}" 검색 결과` : "검색 결과"}
        </h1>
        <p className="text-xs text-gray-500">
          총 {data.totalResults || data.item.length}개의 결과
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {data.item.map((item, index) => (
          <div
            key={item.isbn || index}
            className="flex gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            {item.cover && (
              <img
                src={item.cover}
                alt={item.title}
                className="w-20 h-28 object-cover rounded shadow-sm flex-shrink-0"
              />
            )}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <h3 className="text-sm font-semibold line-clamp-2">
                {item.title}
              </h3>
              {item.author && (
                <p className="text-xs text-gray-500">{item.author}</p>
              )}
              {item.publisher && (
                <p className="text-xs text-gray-400">{item.publisher}</p>
              )}
              {item.description && (
                <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
