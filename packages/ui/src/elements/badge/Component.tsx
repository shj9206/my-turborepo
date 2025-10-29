import { cn } from "@repo/util";
import { IBadgeProps } from "./interface";

const badgeStyles = {
  number: "w-6 h-6 p-1.5 rounded-[20px]",
  icon: "w-4 h-4 p-0.5 rounded-[12px]",
  empty: "w-4 h-4 p-0.5 rounded-[20px]",
} as const;

const Badge = ({ type, className, children }: IBadgeProps) => {
  const hasContent = type === "number" || type === "icon";

  return (
    <div
      className={cn(
        "bg-blue-600 flex justify-center items-center",
        badgeStyles[type],
        className
      )}
    >
      {hasContent && (
        <span className="text-white text-[10px] font-semibold font-['Inter'] uppercase tracking-wide leading-none">
          {children}
        </span>
      )}
    </div>
  );
};

export default Badge;
