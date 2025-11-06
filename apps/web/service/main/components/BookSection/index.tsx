"use client";
import { useQuery } from "@tanstack/react-query";
import { LIST_API_KEY, LIST_API_URL, LIST_TITLE } from "../../constants";
import { IBookSectionProps, ISectionConfig } from "./interface";
import {
  BookCardSection,
  BookCoverSection,
  BookTextSection,
} from "./components";
import { useMemo } from "react";

const SECTION_CONFIG: Record<LIST_API_KEY, ISectionConfig> = {
  [LIST_API_KEY.NEW_ALL]: {
    component: "BookTextSection",
    showTitle: true,
  },
  [LIST_API_KEY.NEW_SPECIAL]: {
    component: "BookCardSection",
    showTitle: false,
  },
  [LIST_API_KEY.BESTSELLER]: {
    component: "BookCoverSection",
    showTitle: true,
  },
  [LIST_API_KEY.BLOG_BEST]: {
    component: "BookCoverSection",
    showTitle: true,
  },
};

export const BookSection = ({ queryKey }: IBookSectionProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async (): Promise<any> => {
      const res = await fetch(LIST_API_URL[queryKey]);
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
  });

  const config = SECTION_CONFIG[queryKey];

  const Component = useMemo(() => {
    if (!data?.item) return null;
    const items = data.item;

    switch (config.component) {
      case "BookCardSection":
        return <BookCardSection items={items} />;
      case "BookCoverSection":
        return <BookCoverSection items={items} />;
      case "BookTextSection":
        return <BookTextSection items={items} />;
    }
  }, [config.component, data?.item]);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <section className="w-full  flex flex-col gap-4 p-6">
      {config.showTitle && (
        <h1 className="text-lg font-semibold justify-start">
          {LIST_TITLE[queryKey]}
        </h1>
      )}
      {Component}
    </section>
  );
};
