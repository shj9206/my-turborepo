"use client";

import { ListItem } from "@/app/_components/ListItem";
import { useEffect, useRef } from "react";
import {
  SEARCH_API_KEY,
  SEARCH_API_URL,
} from "@/service/search/constants/searchApiKey";
import { buildQueryString } from "@repo/util";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ISearchResponse } from "@/service/search";

/**
 * 모바일 검색 리스트
 * @returns 모바일 검색 리스트 컴포넌트
 * @description 모바일 검색 리스트 컴포넌트, Infinite Scroll 포함
 */
export const SearchListMo = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("Query");
  const searchTarget = searchParams.get("SearchTarget");
  const queryType = searchParams.get("QueryType");
  const maxResults = searchParams.get("MaxResults");
  const sort = searchParams.get("Sort");

  const baseParams = {
    QueryType: queryType || ("Keyword" as const),
    Query: query || "",
    SearchTarget: searchTarget || "",
    MaxResults: maxResults || "20",
    Sort: sort || "Accuracy",
  };

  const {
    data: infiniteData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [SEARCH_API_KEY.SEARCH, baseParams, "infinite"],
    queryFn: async ({ pageParam = 1 }): Promise<ISearchResponse> => {
      const params = { ...baseParams, Start: (pageParam as number).toString() };
      const res = await fetch(
        `${SEARCH_API_URL[SEARCH_API_KEY.SEARCH]}?${buildQueryString(params)}`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalResults = lastPage.totalResults || 0;
      const currentTotalItems = allPages.reduce(
        (sum, page) => sum + (page.item?.length || 0),
        0
      );
      if (currentTotalItems >= totalResults) return undefined;
      return allPages.length + 1;
    },
    enabled: !!query, // query가 있을 때만 실행
    initialPageParam: 1,
  });

  // Intersection Observer를 위한 ref
  const observerTarget = useRef<HTMLDivElement>(null);

  // Infinite scroll을 위한 Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Infinite query 데이터에서 모든 아이템을 평탄화
  const allItems =
    infiniteData?.pages.flatMap((page) => page.item || []) || [];
  const totalResults =
    infiniteData?.pages[0]?.totalResults || allItems.length;

  if (isLoading && allItems.length === 0) {
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

  if (allItems.length === 0) {
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
        <p className="text-xs text-gray-500">총 {totalResults}개의 결과</p>
      </div>
      <div className="flex flex-col gap-4">
        {allItems.map((item, index) => (
          <ListItem key={`${item.isbn}-${index}`} item={item} index={index} />
        ))}
      </div>
      {/* Infinite scroll 트리거 요소 */}
      <div ref={observerTarget} className="h-4 w-full" />
      {isFetchingNextPage && (
        <div className="w-full py-4">
          <p className="text-center text-gray-500">더 불러오는 중...</p>
        </div>
      )}
    </div>
  );
};
