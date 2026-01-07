export interface IRadioProps {
  className?: string;
  onChange?: (checked: boolean) => void;
  size?: "small" | "medium" | "large";
  checked?: boolean;
  label?: string;
}
