export interface ICheckboxProps {
  className?: string;
  onChange?: (checked: boolean) => void;
  size?: "small" | "medium" | "large";
  checked?: boolean;
  icon?: "check" | "star" | "heart" | "fill" | "search" | "close";
}
