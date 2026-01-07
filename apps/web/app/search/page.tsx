"use client";

import {
  SEARCH_API_KEY,
  SEARCH_API_URL,
} from "@/service/search/constants/searchApiKey";
import { buildQueryString } from "@repo/util";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ISearchResponse } from "@/service/search";
import { SearchList } from "@/service/search/components/SearchList";
import { ISearchListProps } from "@/service/search/components/SearchList/interface";
import { ListTab } from "@/app/_components";
import { SEARCH_TAB_LIST } from "@/service/search/constants/tabList";
import { PageNation } from "@repo/ui";
import { useView } from "../_provider/viewProvider";

export default function Search() {
  const { IS_MOBILE } = useView();
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

  const searchListProps: ISearchListProps = {
    data,
    isLoading,
    error,
    query,
  };

  const listTabProps = {
    tabList: SEARCH_TAB_LIST(query || ""),
    tagetString: "SearchTarget",
  };
  const totalPages = Math.ceil(
    (data?.totalResults || 0) / ((maxResults as unknown as number) || 20)
  );

  const handlePageChange = (page: number) => {
    router.push(
      `${path}?${buildQueryString({ ...params, Start: page.toString() })}`
    );
  };
  return (
    <section className="w-full mx-auto flex flex-col gap-4 mb-10">
      <ListTab {...listTabProps} />
      <SearchList {...searchListProps} />
      {!IS_MOBILE && (
        <PageNation
          totalPages={totalPages}
          currentPage={start as unknown as number}
          onPageChange={(page: number) => handlePageChange(page)}
        />
      )}
    </section>
  );
}
