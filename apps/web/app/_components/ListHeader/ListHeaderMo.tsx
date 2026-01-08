import { Select } from "@repo/ui";
import { IListHeaderProps } from "./interface";

/**
 * 모바일 리스트 헤더
 * @param handlePageSizeChange - 페이지 크기 변경 핸들러
 * @param handleSortChange - 정렬 방식 변경 핸들러
 * @param sort - 정렬 방식
 * @param maxResults - 페이지 크기
 * @param sortOptions - 정렬 방식 옵션
 * @param maxResultsOptions - 페이지 크기 옵션
 * @returns 모바일 리스트 헤더 컴포넌트
 * @description 모바일 리스트 헤더 컴포넌트
 */
export const ListHeaderMo = ({
  handlePageSizeChange,
  handleSortChange,
  sort,
  maxResults,
  sortOptions,
  maxResultsOptions,
}: IListHeaderProps) => {

  // todo 모바일용으로 수정 필요
  return (
    <section className="w-full flex flex-row justify-end items-center border-b-[2px] border-gray-200 pb-6">
      <div className="flex flex-row items-center gap-2">
        <Select
          options={sortOptions}
          value={sort}
          onChange={handleSortChange}
        />
        <Select
          options={maxResultsOptions}
          value={maxResults}
          onChange={handlePageSizeChange}
        />
      </div>
    </section>
  );
};
