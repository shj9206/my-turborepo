export interface IHeaderProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearch: () => void;
  targetList?: { name: string; value: string }[];
}
