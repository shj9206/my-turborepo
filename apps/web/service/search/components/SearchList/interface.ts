import { ISearchResponse } from "../../interface";
import { InfiniteData } from "@tanstack/react-query";

export interface ISearchListProps {
  data: ISearchResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  query: string | null;
  // MO용 infinite scroll props
  infiniteData?: InfiniteData<ISearchResponse>;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}
