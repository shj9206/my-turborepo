import { cn } from "@repo/util";
import { IButtonProps } from "./interface";

const buttonVariants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50",
  text: "bg-transparent text-blue-600 hover:bg-blue-50",
} as const;

const Button = ({
  label,
  leftIcon,
  rightIcon,
  className,
  onClick,
  variant = "default",
}: IButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-colors h-10",
        "text-[12px] font-bold font-['Inter'] tracking-wide leading-none",
        buttonVariants[variant],
        className
      )}
      onClick={onClick}
    >
      {leftIcon}
      <span>{label}</span>
      {rightIcon}
    </button>
  );
};

export default Button;
