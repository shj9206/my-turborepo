import { IHeaderProps } from "./interface";
import { SearchBar } from "@repo/ui";

const HeaderMo = ({
  searchValue,
  setSearchValue,
  handleSearch,
}: IHeaderProps) => {
  return (
    <section className="w-full mx-auto flex flex-row items-center px-4 py-7 justify-between">
      <SearchBar
        onChange={setSearchValue}
        onSearch={handleSearch}
        value={searchValue}
      />
    </section>
  );
};

export default HeaderMo;
