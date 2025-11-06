export interface ISearchBarProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}
