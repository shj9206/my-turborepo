import Header from "@/app/_components/header";
import { IBaseLayoutProps } from "./interface";
import { Footer } from "@repo/ui";

export default function BaseLayoutMock({ children }: IBaseLayoutProps) {
  return (
    <section className="w-full mx-auto flex flex-col">
      <Header title="Home" />
      {children}
      <Footer />
    </section>
  );
}
