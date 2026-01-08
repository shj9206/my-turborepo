import { useState, useRef, useEffect } from "react";
import { Icon } from "../icon";
import { ISearchBarProps } from "./interface";

export const SearchBar = ({
  placeholder = "미국 주식 500원으로 시작하기",
  onChange,
  value,
  onSearch,
  targetList,
}: ISearchBarProps) => {
  const [target, setTarget] = useState<string>(targetList?.[0]?.value || "");
  const [isTargetOpen, setIsTargetOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleTargetSelect = (value: string) => {
    setTarget(value);
    setIsTargetOpen(false);
  };

  const togglePopover = () => {
    setIsTargetOpen(!isTargetOpen);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        buttonRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsTargetOpen(false);
      }
    };

    if (isTargetOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTargetOpen]);

  return (
    <section className="w-full flex flex-row gap-2 items-center justify-between h-14 rounded-2xl shadow-md border border-gray-200 px-4 py-3">
      <div className="flex flex-row gap-2 items-center w-full relative">
        {targetList && (
          <button
            ref={buttonRef}
            type="button"
            className="relative flex-shrink-0 flex flex-row items-center gap-2 cursor-pointer bg-transparent border-none p-0"
            onClick={togglePopover}
            aria-label={`검색 대상 선택: ${targetList.find((item) => item.value === target)?.name || ""}`}
            aria-expanded={isTargetOpen}
            aria-haspopup="listbox"
          >
            <span
              key={target}
              className="text-center px-4 py-2 transition-colors whitespace-nowrap"
            >
              {targetList.find((item) => item.value === target)?.name}
            </span>
            <Icon
              name="chevronDown"
              className={`w-4 h-4 transition-transform ${
                isTargetOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
            {isTargetOpen && (
              <div
                ref={popoverRef}
                role="listbox"
                className="absolute w-full top-full left-[-15px] mt-2 min-w-[120px] bg-white rounded-xl shadow-lg z-50 border border-gray-200 overflow-hidden animate-in fade-in-0 zoom-in-95"
              >
                <div className="flex flex-col py-1">
                  {targetList?.map((item) => (
                    <button
                      key={item.value}
                      role="option"
                      aria-selected={item.value === target}
                      className={`w-full text-center px-4 py-2 transition-colors ${
                        item.value === target ? "bg-blue-50 font-semibold" : ""
                      }`}
                      onClick={() => handleTargetSelect(item.value)}
                      aria-label={`${item.name} 선택`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </button>
        )}
        <input
          type="text"
          placeholder={placeholder}
          className="w-full h-full rounded-xl p-4 outline-none bg-transparent placeholder:text-gray-300"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSearch(target);
            }
          }}
        />
      </div>
      <button
        className="items-center justify-center cursor-pointer"
        onClick={() => onSearch(target)}
        aria-label="검색"
      >
        <Icon name="search" aria-hidden="true" />
      </button>
    </section>
  );
};
