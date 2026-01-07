import React, { useState } from "react";
import { IListTabProps } from "./interface";
import { cn } from "@repo/util";

export const ListTabMo = (props: IListTabProps) => {
  const { tabList } = props;
  const [activeTab, setActiveTab] = useState(tabList?.[0]?.value || "");
  return (
    <section className="w-full mx-auto px-6 py-2">
      <div className="flex flex-row justify-center w-full">
        {tabList.map((tab) => (
          <button
            className={cn("w-full ", activeTab === tab.value && "font-bold ")}
            key={tab.value}
            onClick={() => {
              setActiveTab(tab.value);
              tab.onClick();
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </section>
  );
  return <div>ListTabMobile</div>;
};
