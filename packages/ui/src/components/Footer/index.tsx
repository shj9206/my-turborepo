import { FooterInk } from "./FooterInk";
import { FooterMok } from "./FooterMok";

import { isMobile } from "../../utils/user-agent";
export const Footer = () => {
  const mobile = isMobile();
  const Component = mobile ? FooterMok : FooterInk;
  return <Component />;
};
