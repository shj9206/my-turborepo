"use client";
import { useState } from "react";
import HeaderMok from "./HeaderMok";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    router.push(`/search?Query=${searchValue}`);
  };
  const Component = HeaderMok;
  return (
    <Component
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      handleSearch={handleSearch}
    />
  );
}
