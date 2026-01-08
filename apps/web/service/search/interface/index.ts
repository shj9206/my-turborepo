


  
  export interface ISearchResponse {
    version?: string;
    title?: string;
    link?: string;
    pubDate?: string;
    totalResults?: number;
    startIndex?: number;
    itemsPerPage?: number;
    query?: string;
    searchCategoryId?: string;
    searchCategoryName?: string;
    item: IBookItem[];
  }
  export interface IBookItem {
    title: string;
    link?: string;
    author?: string;
    pubDate?: string;
    description?: string;
    isbn?: string;
    isbn13?: string;
    itemId?: number;
    priceSales?: number;
    priceStandard?: number;
    cover?: string;
    publisher?: string;
    categoryId?: number;
    categoryName?: string;
    salesPoint?: number;
    adult?: boolean;
    fixedPrice?: boolean;
    customerReviewRank?: number;
    isFavorit?: boolean;
  }