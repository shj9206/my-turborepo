export interface IButtonProps {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "text";
}
