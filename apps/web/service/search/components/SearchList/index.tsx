import { useView } from "@/app/_provider/viewProvider";
import { SearchListPc } from "./SearchListPc";
import { SearchListMo } from "./SearchListMo";

export const SearchList = () => {
  const { IS_MOBILE } = useView();
  const Component = IS_MOBILE ? SearchListMo : SearchListPc;
  return <Component />;
};
