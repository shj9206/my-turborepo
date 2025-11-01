import { cn } from "@repo/util";
import { IToggleProps } from "./interface";

const Toggle = ({
  className,
  onChange,
  checked = false,
  label = "",
}: IToggleProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.checked);
  };
  return (
    <label
      className={cn(
        "relative inline-flex items-center cursor-pointer",
        className
      )}
    >
      <input
        type="checkbox"
        value=""
        className="peer absolute w-0 h-0 opacity-0"
        checked={checked}
        onChange={handleChange}
        aria-hidden="true"
      />
      <div className="relative w-12 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      {label && (
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
};

export default Toggle;
