"use client";
import { useState } from "react";
import HeaderMok from "./HeaderMok";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    console.log(searchValue);
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
