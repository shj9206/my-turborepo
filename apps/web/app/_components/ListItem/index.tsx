import { ListItemPC } from "./ListItemPC";
import { ListItemMo } from "./ListItemMo";
import { useView } from "@/app/_provider/viewProvider";
import { IListItemProps } from "./interface";

export const ListItem = ({ item, index }: IListItemProps) => {
  const { IS_MOBILE } = useView();
  const Component = IS_MOBILE ? ListItemMo : ListItemPC;
  return <Component item={item} index={index} />;
};
