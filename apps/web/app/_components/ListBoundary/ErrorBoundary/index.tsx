import { useView } from "@/app/_provider/viewProvider";
import { IErrorBoundaryProps } from "./interface";
import { cn } from "@repo/util";

export const ErrorBoundary = (props: IErrorBoundaryProps) => {
  const { isError, children } = props;
  const { IS_MOBILE } = useView();

  if (isError) {
    return (
      <div
        className={cn(
          "w-full text-center text-gray-500",
          IS_MOBILE ? "px-4 py-6" : "max-w-7xl mx-auto px-6 py-8"
        )}
      >
        시스템에 문제가 발생했습니다. 관리자에게 문의 부탁드립니다.
      </div>
    );
  }
  return children;
};
