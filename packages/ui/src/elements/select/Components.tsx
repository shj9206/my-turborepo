import { useState } from "react";
import { Icon } from "../icon";
import { ISelectProps } from "./interface";
import { cn } from "@repo/util";

/**
 * 선택 컴포넌트
 * @param options - 옵션 리스트
 * @param value - 선택된 값
 * @param onChange - 값 변경 핸들러
 * @description 선택 컴포넌트
 */
export const Select = ({ options, value, onChange }: ISelectProps) => {
  const [selected, setSelected] = useState<string>(value);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className="h-11 w-40 border rounded-md border-gray-300 px-4 py-2 pr-10 relative"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-row items-center justify-between">
        <span className="text-gray-900">
          {options.find((opt) => opt.value === (selected || value))?.label ||
            selected ||
            value}
        </span>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Icon
            name="chevronDown"
            className={cn(
              "w-4 h-4 text-gray-500 transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )}
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full  bg-white rounded-md shadow-md mt-1 z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-blue-10 relative last:rounded-b-md first:rounded-t-md"
              onClick={() => {
                setSelected(option.value);
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
