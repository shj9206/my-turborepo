import Header from "@/app/_components/Header";
import { IBaseLayoutProps } from "./interface";
import { FooterMo } from "@repo/ui";

export const BaseLayoutMo = ({ children }: IBaseLayoutProps) => {
  return (
    <section className="w-full mx-auto flex flex-col">
      <Header />
      {children}
      <FooterMo />
    </section>
  );
};
