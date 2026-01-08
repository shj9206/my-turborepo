export interface ISearchBarProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onSearch: (target?: string) => void;
  targetList?: { name: string; value: string }[];
}
