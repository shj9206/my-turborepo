"use client";
import { useView } from "@/app/_provider/viewProvider";
import { BaseLayoutMok } from "./BaseLayoutMok";
import { BaseLayoutInk } from "./BaseLayoutInk";

import { IBaseLayoutProps } from "./interface";

export default function BaseLayout({ children }: IBaseLayoutProps) {
  const { IS_MOBILE } = useView();
  const Component = IS_MOBILE ? BaseLayoutMok : BaseLayoutInk;
  return <Component>{children}</Component>;
}
