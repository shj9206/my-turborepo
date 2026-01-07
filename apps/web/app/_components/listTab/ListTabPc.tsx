import React from "react";
import { useState } from "react";
import { IListTabProps } from "./interface";
import { cn } from "@repo/util";

export const ListTabPc = (props: IListTabProps) => {
  const { tabList } = props;
  const [activeTab, setActiveTab] = useState(tabList?.[0]?.value || "");
  return (
    <section className="w-full mx-auto px-6 py-8">
      <div className="flex flex-row w-full justify-center">
        {tabList.map((tab) => (
          <button
            className={cn(
              "w-full border border-gray-300 rounded-t-[4px]  px-4 py-2 border-b-black",
              activeTab === tab.value && "border-black border-b-0 font-bold "
            )}
            onClick={() => {
              setActiveTab(tab.value);
              tab.onClick();
            }}
            key={tab.value}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </section>
  );
};
