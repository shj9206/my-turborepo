import { IListBoundaryProps } from "./interface";
import { SkeletonBoundary } from "./SkeletonBoundary";
import { ErrorBoundary } from "./ErrorBoundary";
import { EmptyBoundary } from "./EmptyBoundary";
export const ListBoundary = ({
  children,
  isLoading,
  isError,
  isEmpty,
}: IListBoundaryProps) => {
  return (
    <SkeletonBoundary isLoading={isLoading}>
      <EmptyBoundary isEmpty={isEmpty}>
        <ErrorBoundary isError={isError}>{children}</ErrorBoundary>
      </EmptyBoundary>
    </SkeletonBoundary>
  );
};
