import { ListItemPC } from "./ListItemPC";
import { ListItemMo } from "./ListItemMo";
import { useView } from "@/app/_provider/viewProvider";
import { IListItemProps } from "./interface";

/**
 * 리스트 아이템
 * @param item - 리스트 아이템 데이터
 * @param index - 리스트 아이템 인덱스
 * @returns 리스트 아이템 컴포넌트
 * @description 반응형 리스트 아이템 컴포넌트, PC, MO 구분
 */
export const ListItem = ({ item, index }: IListItemProps) => {
  const { IS_MOBILE } = useView();
  const Component = IS_MOBILE ? ListItemMo : ListItemPC;
  return <Component item={item} index={index} />;
};
