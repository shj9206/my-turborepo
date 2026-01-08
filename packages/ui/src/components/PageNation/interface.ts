export interface IPageNationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}