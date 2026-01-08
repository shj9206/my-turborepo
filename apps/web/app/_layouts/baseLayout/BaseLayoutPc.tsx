import Header from "@/app/_components/Header";
import { IBaseLayoutProps } from "./interface";
import { FooterPc } from "@repo/ui";

export const BaseLayoutPc = ({ children }: IBaseLayoutProps) => {
  return (
    <section className="w-[calc(100%-600px)] mx-auto flex flex-col">
      <Header />
      {children}
      <FooterPc />
    </section>
  );
};
