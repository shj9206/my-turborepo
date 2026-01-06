"use client";
import { useState } from "react";
import HeaderMo from "./HeaderMo";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    router.push(`/search?Query=${searchValue}`);
  };
  const Component = HeaderMo;
  return (
    <Component
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      handleSearch={handleSearch}
    />
  );
}
