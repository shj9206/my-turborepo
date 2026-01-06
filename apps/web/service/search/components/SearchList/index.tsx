import { useView } from "@/app/_provider/viewProvider";
import { SearchListPc } from "./SearchListPc";
import { SearchListMo } from "./SearchListMo";
import { ISearchListProps } from "./interface";
export const SearchList = (props: ISearchListProps) => {
  const { IS_MOBILE } = useView();
  const Component = IS_MOBILE ? SearchListMo : SearchListPc;
  return <Component {...props} />;
};
