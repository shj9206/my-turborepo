import React from "react";
import { ListTabMo } from "./ListTabMo";
import { ListTabPc } from "./ListTabPc";
import { useView } from "@/app/_provider/viewProvider";
import { IListTabProps } from "./interface";

export const ListTab = (props: IListTabProps) => {
  const { IS_MOBILE } = useView();
  const Component = IS_MOBILE ? ListTabMo : ListTabPc;
  return <Component {...props} />;
};
