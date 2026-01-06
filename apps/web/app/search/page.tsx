"use client";

import {
  SEARCH_API_KEY,
  SEARCH_API_URL,
} from "@/service/search/constants/searchApiKey";
import { buildQueryString } from "@repo/util";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ISearchResponse } from "@/service/search";
import { SearchList } from "@/service/search/components/SearchList";
import { ISearchListProps } from "@/service/search/components/SearchList/interface";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("Query");
  const searchTarget = searchParams.get("SearchTarget");

  const params = {
    QueryType: "Keyword" as const,
    Query: query || "",
    SearchTarget: searchTarget || "",
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

  const searchListProps: ISearchListProps = {
    data,
    isLoading,
    error,
    query,
  };

  return <SearchList {...searchListProps} />;
}
