export const LIST_API_URL = {
  NEW_ALL: "http://localhost:3000/api/list?QueryType=ItemNewAll", //신간 전체 리스트
  NEW_SPECIAL: "http://localhost:3000/api/list?QueryType=ItemNewSpecial", //주목할 만한 신간 리스트
  BESTSELLER: "http://localhost:3000/api/list?QueryType=Bestseller", //베스트셀러
  BLOG_BEST: "http://localhost:3000/api/list?QueryType=BlogBest", //블로거 베스트셀러
};

export const LIST_TITLE = {
  NEW_ALL: "신간 전체 리스트",
  NEW_SPECIAL: "주목할 만한 신간 리스트",
  BESTSELLER: "베스트셀러",
  BLOG_BEST: "블로거 베스트셀러",
};

export enum LIST_API_KEY {
  NEW_ALL = "NEW_ALL",
  NEW_SPECIAL = "NEW_SPECIAL",
  BESTSELLER = "BESTSELLER",
  BLOG_BEST = "BLOG_BEST",
}
