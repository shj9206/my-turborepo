"use client";

import { useSearchParams } from "next/navigation";
import { SearchList } from "@/service/search/components/SearchList";
import { ListTab } from "@/app/_components";
import { SEARCH_TAB_LIST } from "@/service/search/constants/tabList";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("Query");

  const listTabProps = {
    tabList: SEARCH_TAB_LIST(query || ""),
    tagetString: "SearchTarget",
  };

  return (
    <section className="w-full mx-auto flex flex-col gap-4 mb-10">
      <ListTab {...listTabProps} />
      <SearchList />
    </section>
  );
}
