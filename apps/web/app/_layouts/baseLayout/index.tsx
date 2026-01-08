"use client";
import { useView } from "@/app/_provider/viewProvider";
import { BaseLayoutMo } from "./BaseLayoutMo";
import { BaseLayoutPc } from "./BaseLayoutPc";

import { IBaseLayoutProps } from "./interface";

export default function BaseLayout({ children }: IBaseLayoutProps) {
  const { IS_MOBILE } = useView();
  console.log(IS_MOBILE);
  const Component = IS_MOBILE ? BaseLayoutMo : BaseLayoutPc;
  return <Component>{children}</Component>;
}
