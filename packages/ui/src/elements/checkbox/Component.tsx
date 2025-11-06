import { cn } from "@repo/util";
import { ICheckboxProps } from "./interface";
import { Icon } from "../icon";
import { useEffect, useState } from "react";

const Checkbox = ({
  className,
  onChange,
  size = "medium",
  checked,
  icon = "check",
}: ICheckboxProps) => {
  const sizeClasses = {
    small: "w-4 h-4 rounded-[4px]",
    medium: "w-6 h-6 rounded-[6px]",
    large: "w-8 h-8 rounded-lg",
  };

  const iconSizeClasses = {
    small: "w-2.5 h-2.5",
    medium: "w-3 h-3",
    large: "w-4 h-4",
  };

  const [internalChecked, setInternalChecked] = useState<boolean>(
    checked ?? false
  );

  useEffect(() => {
    if (typeof checked === "boolean") {
      setInternalChecked(checked);
    }
  }, [checked]);

  const effectiveChecked =
    typeof checked === "boolean" ? checked : internalChecked;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (typeof checked !== "boolean") {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e.target.checked);
  };

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2  cursor-pointer",
        className
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          className={cn(
            "appearance-none relative block aspect-square leading-none align-middle border border-gray-300 bg-white p-0",
            "checked:bg-blue-600 checked:border-blue-600",
            "focus:outline-none focus:ring-2 focus:ring-blue-300",
            sizeClasses[size]
          )}
          checked={effectiveChecked}
          onChange={handleChange}
        />
        {effectiveChecked && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Icon
              name={icon}
              className={cn("text-white", iconSizeClasses[size])}
            />
          </div>
        )}
      </div>
    </label>
  );
};

export default Checkbox;
