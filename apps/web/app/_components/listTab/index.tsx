import React from "react";
import { ListTabMo } from "./ListTabMo";
import { ListTabPc } from "./ListTabPc";
import { useView } from "@/app/_provider/viewProvider";
import { IListTabProps } from "./interface";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export const ListTab = (props: IListTabProps) => {
  const { IS_MOBILE } = useView();
  const { tabList, tagetString } = props;
  const searchParams = useSearchParams();
  const target = searchParams.get(tagetString);
  const [activeTab, setActiveTab] = useState(target || "");

  useEffect(() => {
    if (target) {
      setActiveTab(target);
    }
  }, [target]);
  const handleTabClick = (value: string) => {
    setActiveTab(value);
    tabList.find((tab) => tab.value === value)?.onClick();
  };
  const listTabProps = {
    tabList,
    handleTabClick,
    activeTab,
  };

  const Component = IS_MOBILE ? ListTabMo : ListTabPc;
  return <Component {...listTabProps} />;
};
