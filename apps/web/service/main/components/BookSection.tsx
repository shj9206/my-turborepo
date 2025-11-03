"use client";
import { useQuery } from "@tanstack/react-query";
import { LIST_API_KEY } from "../constants";

interface BookSectionProps {
  queryKey: keyof typeof LIST_API_KEY;
}

export default function BookSection({ queryKey }: BookSectionProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async (): Promise<any> => {
      const res = await fetch(LIST_API_KEY[queryKey]);
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
  });
  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <h1>BookSection</h1>
      <div>
        {data.item.map((item: any) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </div>
  );
}
