"use client";
import { BookSection, LIST_API_KEY } from "@/service/main";

export default function Main() {
  return (
    <div className="w-full mx-auto flex flex-col">
      <BookSection queryKey={LIST_API_KEY.NEW_SPECIAL} />
      <BookSection queryKey={LIST_API_KEY.NEW_ALL} />
      <BookSection queryKey={LIST_API_KEY.BESTSELLER} />
      <BookSection queryKey={LIST_API_KEY.BLOG_BEST} />
    </div>
  );
}
