"use client";
import { useState } from "react";
import HeaderMo from "./HeaderMo";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const targetList = [
    {
      name: "통합검색",
      value: "All",
    },
    {
      name: "국내도서",
      value: "Book",
    },
    {
      name: "외국도서",
      value: "Foreign",
    },
    {
      name: "eBook",
      value: "eBook",
    },
  ];

  const handleSearch = (target?: string) => {
    const queryParams = new URLSearchParams({
      Query: searchValue,
    });
    if (target) {
      queryParams.append("SearchTarget", target);
    }
    router.push(`/search?${queryParams.toString()}`);
  };
  const Component = HeaderMo;
  return (
    <Component
      targetList={targetList}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      handleSearch={handleSearch}
    />
  );
}
