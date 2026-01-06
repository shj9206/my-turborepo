import { ISearchResponse } from "../../interface";

export interface ISearchListProps {
  data: ISearchResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  query: string | null;
}
