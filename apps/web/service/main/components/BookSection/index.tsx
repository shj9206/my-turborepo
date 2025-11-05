"use client";
import { useQuery } from "@tanstack/react-query";
import { LIST_API_KEY, LIST_API_URL, LIST_TITLE } from "../../constants";
import { IBookSectionProps } from "./interface";
import { BookCardSection } from "./components/BookCardSection";
import { BookCoverSection } from "./components/BookCoverSection";
import { useMemo } from "react";

export const BookSection = ({ queryKey }: IBookSectionProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async (): Promise<any> => {
      const res = await fetch(LIST_API_URL[queryKey]);
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
  });

  const Component = useMemo(() => {
    if (!data?.item) return null;
    switch (queryKey) {
      case LIST_API_KEY.NEW_ALL:
        return <BookCoverSection items={data.item} />;
      case LIST_API_KEY.NEW_SPECIAL:
        return <BookCardSection items={data.item} />;
      case LIST_API_KEY.BESTSELLER:
        return <BookCoverSection items={data.item} />;
      case LIST_API_KEY.BLOG_BEST:
        return <BookCardSection items={data.item} />;
    }
  }, [queryKey, data?.item]);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <section className="w-full mx-auto flex flex-col gap-4 p-6">
      <h1 className="text-lg font-semibold justify-start">
        {LIST_TITLE[queryKey]}
      </h1>
      {Component}
    </section>
  );
};
