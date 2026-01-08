import { cn } from "@repo/util";
import { IRadioProps } from "./interface";

const Radio = ({
  className,
  onChange,
  size = "medium",
  checked,
  label = "",
}: IRadioProps) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  } as const;

  const dotSizeClasses = {
    small: "w-2 h-2",
    medium: "w-3 h-3",
    large: "w-4 h-4",
  } as const;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.checked);
  };

  return (
    <label
      className={cn("inline-flex items-center gap-2 cursor-pointer", className)}
    >
      <div className="relative">
        <input
          type="radio"
          className={cn(
            "peer appearance-none block rounded-full border border-gray-300 bg-white",
            "checked:bg-blue-600",
            "focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1",
            sizeClasses[size]
          )}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white",
            "opacity-0 scale-50 transition-all duration-150 peer-checked:opacity-100 peer-checked:scale-100",
            dotSizeClasses[size]
          )}
        />
      </div>
      {label && <span className="text-sm text-gray-500">{label}</span>}
    </label>
  );
};

export default Radio;
