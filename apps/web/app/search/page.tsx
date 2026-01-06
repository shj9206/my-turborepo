"use client";

import {
  SEARCH_API_KEY,
  SEARCH_API_URL,
} from "@/service/search/constants/searchApiKey";
import { buildQueryString } from "@repo/util";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { SearchContainer } from "./SearchContainer";
import { ISearchResponse } from "@/service/search";
import { useView } from "../_provider/viewProvider";
import { SearchList } from "@/service/search/components/SearchList";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("Query");

  const params = {
    QueryType: "Keyword",
    Query: query || "",
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
  return (
    <SearchList data={data} isLoading={isLoading} error={error} query={query} />
  );
}
