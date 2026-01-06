import { LIST_API_KEY } from "../../constants";

export interface IBookSectionProps {
  queryKey: LIST_API_KEY;
}

export type TSectionComponent =
  | "BookCardSection"
  | "BookCoverSection"
  | "BookTextSection"
  | "ResponsiveCardSection";

export interface ISectionConfig {
  component: TSectionComponent;
  showTitle: boolean;
}
