import { useView } from "@/app/_provider/viewProvider";
import { ISkeletonBoundaryProps } from "./interface";
import { SkeletonBoundaryMo } from "./SkeletonBoundaryMo";
import { SkeletonBoundaryPc } from "./SkeletonBoundaryPc";

export const SkeletonBoundary = (props: ISkeletonBoundaryProps) => {
    const { IS_MOBILE } = useView();
    const Component = IS_MOBILE ? SkeletonBoundaryMo : SkeletonBoundaryPc;
  return <Component {...props} />;
};