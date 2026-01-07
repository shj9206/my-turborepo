import { FooterPc } from "./FooterPc";
import { FooterMo } from "./FooterMo";

import { isMobile } from "../../utils/user-agent";

/**
 * 푸터
 * @returns 푸터 컴포넌트
 * @description 푸터 컴포넌트, PC, MO 구분
 */
export const Footer = () => {
  const mobile = isMobile();
  const Component = mobile ? FooterMo : FooterPc;
  return <Component />;
};
