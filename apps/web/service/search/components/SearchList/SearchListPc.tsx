"use client";

import { ListHeader } from "@/app/_components/ListHeader";
import { SearchFilter } from "../SearchFilter";
import { ListItem } from "@/app/_components/ListItem";
import {
  SEARCH_API_KEY,
  SEARCH_API_URL,
} from "@/service/search/constants/searchApiKey";
import { buildQueryString } from "@repo/util";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ISearchResponse } from "@/service/search";
import { PageNation } from "@repo/ui";
import { ListBoundary } from "@/app/_components/ListBoundary";

/**
 * PC 검색 리스트
 * @returns PC 검색 리스트 컴포넌트
 * @description PC 검색 리스트 컴포넌트, 페이지 네비게이션 포함
 */
export const SearchListPc = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const query = searchParams.get("Query");
  const searchTarget = searchParams.get("SearchTarget");
  const queryType = searchParams.get("QueryType");
  const maxResults = searchParams.get("MaxResults");
  const sort = searchParams.get("Sort");
  const start = searchParams.get("Start");

  const params = {
    QueryType: queryType || ("Keyword" as const),
    Query: query || "",
    SearchTarget: searchTarget || "",
    MaxResults: maxResults || "20",
    Sort: sort || "Accuracy",
    Start: start || "1",
  };

  const { data, isLoading, error } = useQuery<ISearchResponse>({
    queryKey: [SEARCH_API_KEY.SEARCH, params],
    queryFn: async (): Promise<ISearchResponse> => {
      const res = await fetch(
        `${SEARCH_API_URL[SEARCH_API_KEY.SEARCH]}?${buildQueryString(params)}`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
    enabled: !!query, // query가 있을 때만 실행 조회
  });

  const totalPages = Math.ceil(
    (data?.totalResults || 0) / ((maxResults as unknown as number) || 20)
  );

  const handlePageChange = (page: number) => {
    router.push(
      `${path}?${buildQueryString({ ...params, Start: page.toString() })}`
    );
  };

  // 데이터 존재 여부 및 길이 체크
  const isEmpty = !data || !data.item || data.item.length === 0;

  return (
    <>
      <div className="w-full mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {query ? `"${query}" 검색 결과` : "검색 결과"}
          </h1>
          <p className="text-sm text-gray-500">
            총 {data?.totalResults || data?.item?.length || 0}개의 결과
          </p>
        </div>
        <div className="flex flex-row w-full gap-4">
          <SearchFilter />
          <div className="w-full flex flex-col">
            <ListHeader />
            {/* TODO: 검색 결과 리스트 grid, list 타입 구성 */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full mt-4"> */}
            {/* 검색 결과 리스트 */}
            <ListBoundary
              isLoading={isLoading && isEmpty}
              isError={!!error}
              isEmpty={isEmpty}
            >
              {data?.item && (
                <div className="flex flex-col gap-4 py-5">
                  {data.item.map((item, index) => (
                    <ListItem
                      key={item.isbn || index}
                      item={item}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </ListBoundary>
          </div>
        </div>
      </div>
      {!isLoading && !error && (
        <PageNation
          totalPages={totalPages}
          currentPage={(start as unknown as number) || 1}
          onPageChange={(page: number) => handlePageChange(page)}
        />
      )}
    </>
  );
};
