export interface IListHeaderProps {
  handlePageSizeChange: (value: string) => void;
  handleSortChange: (value: string) => void;
  sort: string;
  maxResults: string;
  sortOptions: { value: string; label: string }[];
  maxResultsOptions: { value: string; label: string }[];
}
