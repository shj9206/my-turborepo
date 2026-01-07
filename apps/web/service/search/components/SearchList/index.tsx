import { useView } from "@/app/_provider/viewProvider";
import { SearchListPc } from "./SearchListPc";
import { SearchListMo } from "./SearchListMo";

/**
 * 검색 리스트
 * @returns 검색 리스트 컴포넌트
 * @description 검색 리스트 컴포넌트, PC, MO 구분
 */
export const SearchList = () => {
  const { IS_MOBILE } = useView();
  const Component = IS_MOBILE ? SearchListMo : SearchListPc;
  return <Component />;
};
