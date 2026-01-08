import { ListItemPC } from "./ListItemPC";
import { ListItemMo } from "./ListItemMo";
import { useView } from "@/app/_provider/viewProvider";
import { IListItemProps } from "./interface";
import { useRouter } from "next/navigation";

/**
 * 리스트 아이템
 * @param item - 리스트 아이템 데이터
 * @param index - 리스트 아이템 인덱스
 * @returns 리스트 아이템 컴포넌트
 * @description 반응형 리스트 아이템 컴포넌트, PC, MO 구분
 */
export const ListItem = ({ item, index }: IListItemProps) => {
  const { IS_MOBILE } = useView();
  const router = useRouter();

  const handleOnClickItem = () => {
    if (!item.isbn13) {
      console.warn("isbn13 is missing for item:", item);
      return;
    }
    router.push(`/product/${item.isbn13}`);
  };
  const Component = IS_MOBILE ? ListItemMo : ListItemPC;
  return (
    <Component item={item} index={index} handleOnClick={handleOnClickItem} />
  );
};
