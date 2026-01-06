"use client";

import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function QueryDemo() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["demo-todo", 1],
    queryFn: async (): Promise<Todo> => {
      const res = await fetch("http://localhost:3000/api/list");
      if (!res.ok) throw new Error("Failed to fetch demo data");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div style={{ marginTop: 12 }}>
      <strong>React Query Demo</strong>
      <div>ID: {data?.id}</div>
      <div>Title: {data?.title}</div>
      <div>Done: {String(data?.completed)}</div>
    </div>
  );
}
