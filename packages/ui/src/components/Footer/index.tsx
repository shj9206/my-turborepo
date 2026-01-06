import { FooterPc } from "./FooterPc";
import { FooterMo } from "./FooterMo";

import { isMobile } from "../../utils/user-agent";
export const Footer = () => {
  const mobile = isMobile();
  const Component = mobile ? FooterMo : FooterPc;
  return <Component />;
};
