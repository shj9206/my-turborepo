import Header from "@/app/_components/header";
import { IBaseLayoutProps } from "./interface";
import { Footer } from "@repo/ui";

export const BaseLayoutInk = ({ children }: IBaseLayoutProps) => {
  return (
    <section className="w-[calc(100%-600px)] mx-auto flex flex-col">
      <Header />
      {children}
      <Footer />
    </section>
  );
};
