import { Select } from "@repo/ui";
import { IListHeaderProps } from "./interface";

export const ListHeaderPc = ({
  handlePageSizeChange,
  handleSortChange,
  sort,
  maxResults,
  sortOptions,
  maxResultsOptions,
}: IListHeaderProps) => {
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
