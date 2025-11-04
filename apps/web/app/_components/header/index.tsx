import { IHeaderProps } from "./interface";
import HeaderMok from "./HeaderMok";

export default function Header({ title }: IHeaderProps) {
  const Component = HeaderMok;
  return <Component title={title} />
}