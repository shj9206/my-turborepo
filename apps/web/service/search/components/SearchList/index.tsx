import { useView } from "@/app/_provider/viewProvider";
import { SearchListInk } from "./SearchListInk";
import { SearchListMok } from "./SearchListMok";
import { ISearchListProps } from "./interface";
export const SearchList = (props: ISearchListProps) => {
  const { IS_MOBILE } = useView();
  const Component = IS_MOBILE ? SearchListMok : SearchListInk;
  return <Component {...props} />;
};
