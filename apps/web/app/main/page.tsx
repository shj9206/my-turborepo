"use client";
import { BookSection } from "@/service/main";

export default function Main() {
  return (
    <div>
      <h1>Main</h1>
      <BookSection queryKey="NEW_ALL" />
    </div>
  );
}
