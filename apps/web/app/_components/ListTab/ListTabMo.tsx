import React from "react";
import { IListTabComponentProps } from "./interface";
import { cn } from "@repo/util";

export const ListTabMo = (props: IListTabComponentProps) => {
  const { tabList, handleTabClick, activeTab } = props;
  return (
    <section className="w-full mx-auto px-6 py-2">
      <div className="flex flex-row justify-center w-full">
        {tabList.map((tab) => (
          <button
            className={cn("w-full ", activeTab === tab.value && "font-bold ")}
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            aria-label={`${tab.name} 탭`}
            aria-current={activeTab === tab.value ? "page" : undefined}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </section>
  );
};
