"use client";

import { ListHeader } from "@/app/_components/ListHeader";
import { SearchFilter } from "../SearchFilter";
import { ISearchListProps } from "./interface";
import { ListItem } from "@/app/_components/ListItem";

export const SearchListPc = ({
  data,
  isLoading,
  error,
  query,
}: ISearchListProps) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        <p className="text-center text-gray-500">검색 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        <p className="text-center text-red-500">에러: {error.message}</p>
      </div>
    );
  }

  if (!data || !data.item || data.item.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-8">
        <p className="text-center text-gray-500">
          {query
            ? `"${query}"에 대한 검색 결과가 없습니다.`
            : "검색어를 입력해주세요."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {query ? `"${query}" 검색 결과` : "검색 결과"}
        </h1>
        <p className="text-sm text-gray-500">
          총 {data.totalResults || data.item.length}개의 결과
        </p>
      </div>
      <div className="flex flex-row w-full gap-4">
        <SearchFilter />
        <div className="w-full flex flex-col">
          <ListHeader />
          {/* TODO: 검색 결과 리스트 grid, list 타입 구성 */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full mt-4"> */}
          <div className="flex flex-col gap-4 py-5">
            {data.item.map((item, index) => (
              <ListItem key={item.isbn || index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
