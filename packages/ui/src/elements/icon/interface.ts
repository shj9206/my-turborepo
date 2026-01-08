export interface IIconProps {
  name:
    | "check"
    | "fill"
    | "star"
    | "heart"
    | "search"
    | "close"
    | "chevronDown"
    | "chevronLeft"
    | "chevronRight"
    | "chevronDoubleLeft"
    | "chevronDoubleRight";
  className?: string;
  size?: "sm" | "md" | "lg";
}
