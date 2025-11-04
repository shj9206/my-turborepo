import BaseLayoutMock from "./BaseLayoutMok";
import { IBaseLayoutProps } from "./interface";

export default function BaseLayout({
  children,
}: IBaseLayoutProps) {
  const Component = BaseLayoutMock;
  return <Component>{children}</Component>;
}
