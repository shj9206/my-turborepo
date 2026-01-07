import { IListBoundaryProps } from "./interface";
import { SkeletonBoundary } from "./SkeletonBoundary";
export const ListBoundary = ({
  children,
  isLoading,
  isError,
  isEmpty,
}: IListBoundaryProps) => {
  return <SkeletonBoundary isLoading={isLoading}>{children}</SkeletonBoundary>;
};
