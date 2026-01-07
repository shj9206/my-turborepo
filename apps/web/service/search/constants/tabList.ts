import { useRouter } from "next/navigation";

export const SEARCH_TAB_LIST = (
  query: string
): { name: string; value: string; onClick: () => void }[] => {
  const router = useRouter();
  return [
    {
      name: "통합검색",
      value: "All",
      onClick: () => {
        router.push(`/search?Query=${query}&SearchTarget=All`);
      },
    },
    {
      name: "국내도서",
      value: "Book",
      onClick: () => {
        router.push(`/search?Query=${query}&SearchTarget=Book`);
      },
    },
    {
      name: "외국도서",
      value: "Foreign",
      onClick: () => {
        router.push(`/search?Query=${query}&SearchTarget=Foreign`);
      },
    },
    {
      name: "eBook",
      value: "eBook",
      onClick: () => {
        router.push(`/search?Query=${query}&SearchTarget=eBook`);
      },
    },
  ];
};
