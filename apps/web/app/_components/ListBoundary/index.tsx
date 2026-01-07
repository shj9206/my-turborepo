import { IListBoundaryProps } from "./interface";
import { SkeletonBoundary } from "./SkeletonBoundary";
export const ListBoundary = ({ children, isFirstLoading }: IListBoundaryProps) => {
  return <SkeletonBoundary isFirstLoading={isFirstLoading}>{children}</SkeletonBoundary>;
};
