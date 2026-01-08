import { IBookItem } from "@/service/search";

export interface IProductDetailResponse {
  version?: string;
  title?: string;
  link?: string;
  pubDate?: string;
  item: IBookItem[];
}

export interface IProductDetailProps {
  isbn13: string;
}
