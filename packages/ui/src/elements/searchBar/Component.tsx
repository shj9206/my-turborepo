import { Icon } from "../icon";
import { ISearchBarProps } from "./interface";

export const SearchBar = ({
  placeholder = "미국 주식 500원으로 시작하기",
  onChange,
  value,
  onSearch,
}: ISearchBarProps) => {
  return (
    <section className="w-full flex flex-row gap-2 items-center justify-between h-11 bg-blue-700 rounded-2xl shadow-md px-4 py-3">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-full rounded-xl p-4 outline-none bg-transparent placeholder:text-blue-300 text-white"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSearch();
          }
        }}
      />
      <button
        className="items-center justify-center cursor-pointer"
        onClick={onSearch}
      >
        <Icon name="search" />
      </button>
    </section>
  );
};
