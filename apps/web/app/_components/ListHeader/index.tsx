import { useView } from "@/app/_provider/viewProvider";
import { ListHeaderMo } from "./ListHeaderMo";
import { ListHeaderPc } from "./ListHeaderPc";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";

/**
 * 리스트 헤더
 * @returns 리스트 헤더 컴포넌트
 * @description 리스트 헤더 컴포넌트, PC, MO 구분
 */
export const ListHeader = () => {
  const { IS_MOBILE } = useView();
  const searchParams = useSearchParams();
  const sort = searchParams.get("Sort");
  const maxResults = searchParams.get("MaxResults");

  const router = useRouter();
  const queryParams = new URLSearchParams(searchParams.toString());
  const path = usePathname();

  const sortOptions = [
    { value: "Accuracy", label: "관련순" },
    { value: "PublishTime", label: "출간일순" },
    { value: "Title", label: "제목순" },
    { value: "SalesPoint", label: "판매순" },
    { value: "CustomerRating", label: "평점순" },
    { value: "MyReviewCount", label: "리뷰순" },
  ];
  const maxResultsOptions = [
    { value: "20", label: "20개씩 보기" },
    { value: "40", label: "40개씩 보기" },
  ];
  const handlePageSizeChange = (value: string) => {
    queryParams.set("MaxResults", value);
    router.push(`${path}?${queryParams.toString()}`);
  };
  const handleSortChange = (value: string) => {
    queryParams.set("Sort", value);
    router.push(`${path}?${queryParams.toString()}`);
  };

  const listHeaderProps = {
    handlePageSizeChange,
    handleSortChange,
    sort: sort || "Accuracy",
    maxResults: maxResults || "20",
    sortOptions,
    maxResultsOptions,
  };

  const Component = IS_MOBILE ? ListHeaderMo : ListHeaderPc;
  return <Component {...listHeaderProps} />;
};
