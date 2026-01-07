import { Radio } from "@repo/ui";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryType = searchParams.get("QueryType") || "Keyword";

  const [checkedList, setCheckedList] = useState<
    { label: string; value: string; checked: boolean }[]
  >([
    { label: "전체", value: "Keyword", checked: true },
    { label: "제목", value: "Title", checked: false },
    { label: "저자", value: "Author", checked: false },
    { label: "출판사", value: "Publisher", checked: false },
  ]);

  useEffect(() => {
    setCheckedList((prev) =>
      prev.map((item) => ({
        ...item,
        checked: item.value === queryType,
      }))
    );
  }, [queryType]);

  const handleCheckedChange = (value: string, checked: boolean) => {
    setCheckedList(
      checkedList.map((i) => ({
        ...i,
        checked: i.value === value,
      }))
    );

    // checked가 true인 항목만 router push
    if (checked) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("QueryType", value);
      router.push(`/search?${newParams.toString()}`);
    }
  };

  return (
    <section className="w-full max-w-[200px] mx-auto flex flex-col gap-4">
      <span className="text-lg font-bold">필터</span>
      <div className="flex flex-col gap-4  pt-4 px-4 justify-start items-start ">
        {checkedList.map((item) => (
          <Radio
            key={item.value}
            checked={item.checked}
            onChange={(checked) => {
              handleCheckedChange(item.value, checked);
            }}
            label={item.label}
          />
        ))}
      </div>
    </section>
  );
};
